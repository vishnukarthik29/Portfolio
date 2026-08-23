<template>
  <canvas
    v-show="!useFallback"
    ref="canvasRef"
    class="fixed inset-0 -z-10 pointer-events-none block w-full h-full"
    aria-hidden="true"
  ></canvas>
  <div
    v-if="useFallback"
    class="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    aria-hidden="true"
  >
    <div class="absolute inset-0" :style="fallbackStripeStyle"></div>
    <svg class="absolute inset-0 w-full h-full" :style="{ opacity: isDark ? 0.05 : 0.035 }">
      <filter id="metal-beams-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#metal-beams-grain)" />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  beamWidth: { type: Number, default: 3 },
  beamHeight: { type: Number, default: 25 },
  beamNumber: { type: Number, default: 10 },
  speed: { type: Number, default: 2 },
  noiseIntensity: { type: Number, default: 2 },
  scale: { type: Number, default: 0.2 },
  rotation: { type: Number, default: 30 },
  /** Force a theme; when null the `dark` class on <html> drives it. */
  theme: { type: String, default: null },
})

const canvasRef = ref(null)
const useFallback = ref(false)
const isDark = ref(false)

const fallbackStripeStyle = computed(() => {
  const a = isDark.value ? '#050505' : '#dddddd'
  const b = isDark.value ? '#0e0e0e' : '#f0f0f0'
  return {
    backgroundImage: `repeating-linear-gradient(30deg, ${a} 0px, ${b} 2px, ${a} 4px)`,
  }
})

let beams = null
let resizeObserver = null
let intersectionObserver = null
let domObserver = null
let loadTimer = null
let disposed = false

const readDarkFromDom = () => document.documentElement.classList.contains('dark')

const syncTheme = () => {
  isDark.value = props.theme ? props.theme === 'dark' : readDarkFromDom()
  beams?.setTheme(isDark.value)
}

const shouldUseFallback = () => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true

  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4
  return Boolean(coarsePointer && lowMemory)
}

const resize = () => {
  // Measure the canvas itself rather than the window: a canvas is a replaced
  // element, so CSS owns its layout size and window.innerWidth would include
  // the scrollbar.
  const canvas = canvasRef.value
  if (!canvas) return
  beams?.setSize(canvas.clientWidth, canvas.clientHeight)
}

const handleVisibility = () => {
  if (document.hidden) beams?.stop()
  else beams?.start()
}

const boot = async () => {
  if (disposed || !canvasRef.value) return

  try {
    const { createBeams } = await import('./beamsEngine.js')
    if (disposed || !canvasRef.value) return

    beams = createBeams(canvasRef.value, {
      beamWidth: props.beamWidth,
      beamHeight: props.beamHeight,
      beamNumber: props.beamNumber,
      speed: props.speed,
      noiseIntensity: props.noiseIntensity,
      scale: props.scale,
      rotation: props.rotation,
      dark: isDark.value,
    })
  } catch (err) {
    console.warn('[MetalBeams] WebGL init failed, falling back to CSS:', err)
    useFallback.value = true
    return
  }

  resize()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(document.documentElement)

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting)
      if (visible && !document.hidden) beams.start()
      else beams.stop()
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvasRef.value)

  document.addEventListener('visibilitychange', handleVisibility)

  beams.start()
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

  // Let the first paint land before pulling in three.js.
  loadTimer = setTimeout(boot, 300)
})

onBeforeUnmount(() => {
  disposed = true
  if (loadTimer) clearTimeout(loadTimer)
  document.removeEventListener('visibilitychange', handleVisibility)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  domObserver?.disconnect()
  beams?.dispose()
  beams = null
})
</script>
