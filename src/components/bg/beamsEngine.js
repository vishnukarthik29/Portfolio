/**
 * Brushed-metal "beams" background.
 *
 * Ported from the React Three Fiber implementation in
 * https://github.com/valentin-gil/portfolio (app/components/Beams.tsx) to plain
 * three.js so it can run inside a Vue SFC without pulling in R3F/drei.
 *
 * The shader, geometry builder and scene layout are kept faithful to the
 * original; only the React-specific plumbing (Canvas, useFrame, useMemo) is
 * replaced by an explicit renderer + animation loop.
 */

import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  ShaderLib,
  ShaderMaterial,
  SRGBColorSpace,
  UniformsUtils,
  WebGLRenderer,
} from 'three'

/**
 * Rebuilds three's `physical` shader with extra chunks injected at the given
 * `#include` sites, so we get full MeshStandardMaterial lighting plus our own
 * vertex displacement and grain.
 */
function extendMaterial(BaseMaterial, cfg) {
  const physical = ShaderLib.physical
  const {
    vertexShader: baseVert,
    fragmentShader: baseFrag,
    uniforms: baseUniforms,
  } = physical
  const baseDefines = physical.defines ?? {}

  const uniforms = UniformsUtils.clone(baseUniforms)

  const defaults = new BaseMaterial(cfg.material || {})

  if (defaults.color) uniforms.diffuse.value = defaults.color
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u }
  })

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ''}\n${baseVert}`
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ''}\n${baseFrag}`

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}\n${code}`)
  }
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}\n${code}`)
  }

  return new ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog,
  })
}

const hexToNormalizedRGB = (hex) => {
  const clean = hex.replace('#', '')
  return [
    parseInt(clean.substring(0, 2), 16) / 255,
    parseInt(clean.substring(2, 4), 16) / 255,
    parseInt(clean.substring(4, 6), 16) / 255,
  ]
}

const noise = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`

/**
 * A single indexed geometry holding `n` vertical ribbons side by side, each
 * with its own random UV offset so the noise reads differently per beam.
 */
function createStackedPlanesBufferGeometry(n, width, height, spacing, heightSegments) {
  const geometry = new BufferGeometry()
  const numVertices = n * (heightSegments + 1) * 2
  const numFaces = n * heightSegments * 2
  const positions = new Float32Array(numVertices * 3)
  const indices = new Uint32Array(numFaces * 3)
  const uvs = new Float32Array(numVertices * 2)

  let vertexOffset = 0
  let indexOffset = 0
  let uvOffset = 0
  const totalWidth = n * width + (n - 1) * spacing
  const xOffsetBase = -totalWidth / 2

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing)
    const uvXOffset = Math.random() * 300
    const uvYOffset = Math.random() * 300

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5)
      const v0 = [xOffset, y, 0]
      const v1 = [xOffset + width, y, 0]
      positions.set([...v0, ...v1], vertexOffset * 3)

      const uvY = j / heightSegments
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset)

      if (j < heightSegments) {
        const a = vertexOffset
        const b = vertexOffset + 1
        const c = vertexOffset + 2
        const d = vertexOffset + 3
        indices.set([a, b, c, c, b, d], indexOffset)
        indexOffset += 6
      }
      vertexOffset += 2
      uvOffset += 4
    }
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
  geometry.setIndex(new BufferAttribute(indices, 1))
  geometry.computeVertexNormals()
  return geometry
}

// Per-theme palette, matching the original.
const THEMES = {
  dark: { diffuse: '#000000', background: '#000000', dirIntensity: 2, ambIntensity: 1 },
  light: { diffuse: '#bbbbbb', background: '#dddddd', dirIntensity: 3, ambIntensity: 1.5 },
}

/**
 * Boots the effect onto `canvas`.
 *
 * Returns handles for the caller to drive: the component owns *when* things
 * happen (visibility, theme changes, teardown), this module owns *what* is
 * drawn.
 */
export function createBeams(canvas, options = {}) {
  const {
    beamWidth = 3,
    beamHeight = 25,
    beamNumber = 10,
    speed = 2,
    noiseIntensity = 2,
    scale = 0.2,
    rotation = 30,
    dark = true,
  } = options

  let palette = dark ? THEMES.dark : THEMES.light

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.outputColorSpace = SRGBColorSpace

  const scene = new Scene()
  scene.background = new Color(palette.background)

  const camera = new PerspectiveCamera(30, 1, 0.1, 1000)
  camera.position.set(0, 0, 20)

  const material = extendMaterial(MeshStandardMaterial, {
    header: `
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${noise}`,
    vertexHeader: `
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,
    fragmentHeader: '',
    vertex: {
      '#include <begin_vertex>': `transformed.z += getPos(transformed.xyz);`,
      '#include <beginnormal_vertex>': `objectNormal = getNormal(position.xyz);`,
    },
    fragment: {
      '#include <dithering_fragment>': `
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`,
    },
    material: { fog: true },
    uniforms: {
      diffuse: new Color(...hexToNormalizedRGB(palette.diffuse)),
      time: { shared: true, mixed: true, linked: true, value: 0 },
      roughness: 0.3,
      metalness: 0.3,
      uSpeed: { shared: true, mixed: true, linked: true, value: speed },
      envMapIntensity: 10,
      uNoiseIntensity: noiseIntensity,
      uScale: scale,
    },
  })

  const geometry = createStackedPlanesBufferGeometry(beamNumber, beamWidth, beamHeight, 0, 100)
  const mesh = new Mesh(geometry, material)

  const group = new Group()
  group.rotation.z = MathUtils.degToRad(rotation)
  group.add(mesh)

  const dirLight = new DirectionalLight('#ffffff', palette.dirIntensity)
  dirLight.position.set(0, 3, 10)
  dirLight.shadow.camera.top = 24
  dirLight.shadow.camera.bottom = -24
  dirLight.shadow.camera.left = -24
  dirLight.shadow.camera.right = 24
  dirLight.shadow.camera.far = 64
  dirLight.shadow.bias = -0.004
  group.add(dirLight)

  const ambient = new AmbientLight('#ffffff', palette.ambIntensity)
  scene.add(group, ambient)

  let rafId = null
  let running = false
  let lastFrame = 0
  let lastUpdate = 0

  const frame = (now) => {
    if (!running) return
    rafId = requestAnimationFrame(frame)

    const delta = (now - lastFrame) / 1000
    lastFrame = now

    if (document.hidden) return

    // The original advances `time` at most every 33ms; keeping the same
    // cadence keeps the drift speed identical to the reference.
    if (now - lastUpdate >= 33) {
      lastUpdate = now
      material.uniforms.time.value += 0.1 * delta
    }

    renderer.render(scene, camera)
  }

  return {
    setSize(width, height) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    },

    setTheme(isDark) {
      palette = isDark ? THEMES.dark : THEMES.light
      const [r, g, b] = hexToNormalizedRGB(palette.diffuse)
      material.uniforms.diffuse.value.setRGB(r, g, b)
      material.needsUpdate = true
      scene.background.set(palette.background)
      dirLight.intensity = palette.dirIntensity
      ambient.intensity = palette.ambIntensity
      if (!running) renderer.render(scene, camera)
    },

    start() {
      if (running) return
      running = true
      lastFrame = performance.now()
      lastUpdate = 0
      rafId = requestAnimationFrame(frame)
    },

    stop() {
      running = false
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    },

    dispose() {
      this.stop()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss?.()
    },
  }
}
