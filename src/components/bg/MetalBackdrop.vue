<template>
  <canvas
    v-if="!useFallback"
    ref="canvasRef"
    class="fixed inset-0 -z-10 pointer-events-none"
    aria-hidden="true"
  ></canvas>
  <div v-else class="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0" :style="fallbackStripeStyle"></div>
    <svg class="absolute inset-0 w-full h-full" :style="{ opacity: isDark ? 0.05 : 0.035 }">
      <filter id="metal-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#metal-grain)" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const VERTEX_SRC = `#version 300 es
precision highp float;
const vec2 positions[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2( 3.0, -1.0),
  vec2(-1.0,  3.0)
);
void main() {
  gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
}
`

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_resolution;
uniform float u_theme;

out vec4 outColor;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gradientNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    sum += amp * gradientNoise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return sum;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 res = u_resolution;
  vec2 uv = gl_FragCoord.xy / res;
  uv.x *= res.x / res.y;

  float angle = radians(35.0);
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 ruv = rot * uv;

  // squash heavily along one axis so noise elongates into brush strokes
  vec2 streakUv = vec2(ruv.x * 0.15, ruv.y * 3.0);

  // domain warp: offset sample position using an earlier, cheaper noise pass
  vec2 warp = vec2(
    fbm(streakUv * 0.6 + u_time * 0.015),
    fbm(streakUv * 0.6 - u_time * 0.01)
  );
  vec2 warped = streakUv + warp * 0.35;

  float grain0 = fbm(warped);
  float brushed = 0.5 + 0.5 * grain0;

  // specular bands travel along the diagonal axis, perturbed by smoothed pointer
  float axis = ruv.x + (u_mouse.x - 0.5) * 0.6;
  float drift = u_time * 0.05;
  float tilt = (u_mouse.y - 0.5) * 0.25;

  float bands = 0.0;
  float positions[3] = float[3](-0.6, 0.05, 0.65);
  for (int i = 0; i < 3; i++) {
    float pos = positions[i] + drift + tilt * float(i - 1);
    float d = axis - pos;
    float width = 0.10 + 0.02 * float(i);
    bands += smoothstep(width, 0.0, abs(d));
  }
  bands = clamp(bands, 0.0, 1.0);

  // per-pixel animated grain
  float g = hash(gl_FragCoord.xy + u_time * 60.0);
  float grain = (g - 0.5) * 0.06;

  // dark metal palette
  vec3 darkBase = mix(vec3(0.02, 0.02, 0.02), vec3(0.055, 0.055, 0.055), brushed);
  vec3 darkSpec = vec3(1.0, 0.98, 0.94);
  vec3 darkColor = darkBase + darkSpec * bands * 0.55;

  // light silk palette
  vec3 lightBase = mix(vec3(0.96, 0.96, 0.96), vec3(0.985, 0.985, 0.985), brushed);
  vec3 lightSpec = vec3(1.0, 1.0, 1.0);
  vec3 lightColor = lightBase - (1.0 - lightSpec) * 0.0 + vec3(bands * 0.18);

  vec3 color = mix(darkColor, lightColor, u_theme);
  color += grain * mix(1.0, 0.5, u_theme);

  outColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

const props = defineProps({
  theme: {
    type: String,
    default: null,
  },
})

const canvasRef = ref(null)
const useFallback = ref(false)
const isDark = ref(false)

const fallbackStripeStyle = ref({})

let gl = null
let program = null
let rafId = null
let resizeObserver = null
let intersectionObserver = null
let domObserver = null
let running = false

let uTimeLoc = null
let uMouseLoc = null
let uResolutionLoc = null
let uThemeLoc = null

let startTime = 0
let targetMouse = [0.5, 0.5]
let currentMouse = [0.5, 0.5]
let targetTheme = 0
let currentTheme = 0
let dpr = 1

const updateFallbackStyle = () => {
  const a = isDark.value ? '#050505' : '#fafafa'
  const b = isDark.value ? '#0e0e0e' : '#f0f0f0'
  fallbackStripeStyle.value = {
    backgroundImage: `repeating-linear-gradient(35deg, ${a} 0px, ${b} 2px, ${a} 4px)`,
  }
}

const readDarkFromDom = () => document.documentElement.classList.contains('dark')

const syncTheme = () => {
  if (props.theme) {
    isDark.value = props.theme === 'dark'
  } else {
    isDark.value = readDarkFromDom()
  }
  targetTheme = isDark.value ? 0.0 : 1.0
  updateFallbackStyle()
}

const shouldUseFallback = () => {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return true

  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4
  if (coarsePointer && lowMemory) return true

  return false
}

const compileShader = (glCtx, type, source) => {
  const shader = glCtx.createShader(type)
  glCtx.shaderSource(shader, source)
  glCtx.compileShader(shader)
  if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
    const log = glCtx.getShaderInfoLog(shader)
    glCtx.deleteShader(shader)
    throw new Error(`Shader compile error: ${log}`)
  }
  return shader
}

const initGL = () => {
  const canvas = canvasRef.value
  gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
  if (!gl) return false

  try {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)

    program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program)
      throw new Error(`Program link error: ${log}`)
    }

    gl.useProgram(program)

    uTimeLoc = gl.getUniformLocation(program, 'u_time')
    uMouseLoc = gl.getUniformLocation(program, 'u_mouse')
    uResolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    uThemeLoc = gl.getUniformLocation(program, 'u_theme')

    return true
  } catch (err) {
    console.warn('[MetalBackdrop] WebGL init failed, falling back to CSS:', err)
    return false
  }
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas || !gl) return
  dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  const width = Math.floor(window.innerWidth * dpr)
  const height = Math.floor(window.innerHeight * dpr)
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    gl.viewport(0, 0, width, height)
  }
}

const render = (time) => {
  if (!running || !gl) return
  const t = (time - startTime) / 1000

  currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.08
  currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.08
  currentTheme += (targetTheme - currentTheme) * 0.08

  gl.uniform1f(uTimeLoc, t)
  gl.uniform2f(uMouseLoc, currentMouse[0], currentMouse[1])
  gl.uniform2f(uResolutionLoc, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.uniform1f(uThemeLoc, currentTheme)

  gl.drawArrays(gl.TRIANGLES, 0, 3)

  rafId = requestAnimationFrame(render)
}

const startLoop = () => {
  if (running || !gl) return
  running = true
  startTime = performance.now() - (startTime ? 0 : 0)
  rafId = requestAnimationFrame((t) => {
    if (!startTime) startTime = t
    render(t)
  })
}

const stopLoop = () => {
  running = false
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

const handlePointerMove = (e) => {
  targetMouse = [e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight]
}

onMounted(() => {
  useFallback.value = shouldUseFallback()
  syncTheme()

  if (!props.theme) {
    domObserver = new MutationObserver(syncTheme)
    domObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  if (useFallback.value) return

  requestAnimationFrame(() => {
    const ok = canvasRef.value ? initGL() : false
    if (!ok) {
      useFallback.value = true
      return
    }

    resize()
    startTime = 0

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(document.documentElement)

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !document.hidden) {
            startLoop()
          } else {
            stopLoop()
          }
        })
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvasRef.value)

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopLoop()
      } else {
        startLoop()
      }
    })

    startLoop()
  })
})

onBeforeUnmount(() => {
  stopLoop()
  window.removeEventListener('pointermove', handlePointerMove)
  if (resizeObserver) resizeObserver.disconnect()
  if (intersectionObserver) intersectionObserver.disconnect()
  if (domObserver) domObserver.disconnect()
  if (gl) {
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
})
</script>
