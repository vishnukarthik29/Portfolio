<template>
  <canvas ref="canvasRef" class="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let grainCanvas = null
let animationFrameId = null
let width = 0
let height = 0
let dpr = 1
let startTime = 0

const BAND_COUNT = 5
const BAND_ANGLE = -20 * (Math.PI / 180) // degrees to radians

const buildGrainTile = () => {
  const size = 160
  const tile = document.createElement('canvas')
  tile.width = size
  tile.height = size
  const tctx = tile.getContext('2d')
  const imageData = tctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const v = Math.random() * 255
    imageData.data[i] = v
    imageData.data[i + 1] = v
    imageData.data[i + 2] = v
    imageData.data[i + 3] = 22
  }
  tctx.putImageData(imageData, 0, 0)
  return tile
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const isDark = () => document.documentElement.classList.contains('dark')

const draw = (time) => {
  if (!ctx) return
  const t = (time - startTime) / 1000
  const dark = isDark()

  const bg = dark ? '#050505' : '#f4f4f4'
  const bandColor = dark ? 255 : 0
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)

  // Diagonal, slowly drifting metallic light bands
  const diagLength = Math.hypot(width, height) * 1.4
  ctx.save()
  ctx.translate(width / 2, height / 2)
  ctx.rotate(BAND_ANGLE)
  ctx.translate(-diagLength / 2, -diagLength / 2)

  const period = diagLength / BAND_COUNT
  const drift = ((t * 22) % period + period) % period

  for (let i = -1; i <= BAND_COUNT + 1; i++) {
    const centerX = i * period + drift
    const bandWidth = period * 0.56
    const grad = ctx.createLinearGradient(centerX - bandWidth, 0, centerX + bandWidth, 0)
    const peak = dark ? 0.55 : 0.4
    grad.addColorStop(0, `rgba(${bandColor},${bandColor},${bandColor},0)`)
    grad.addColorStop(0.32, `rgba(${bandColor},${bandColor},${bandColor},${peak * 0.35})`)
    grad.addColorStop(0.46, `rgba(${bandColor},${bandColor},${bandColor},${peak})`)
    grad.addColorStop(0.5, `rgba(${bandColor},${bandColor},${bandColor},${peak * 0.75})`)
    grad.addColorStop(0.58, `rgba(${bandColor},${bandColor},${bandColor},${peak})`)
    grad.addColorStop(0.72, `rgba(${bandColor},${bandColor},${bandColor},${peak * 0.3})`)
    grad.addColorStop(1, `rgba(${bandColor},${bandColor},${bandColor},0)`)
    ctx.fillStyle = grad
    ctx.fillRect(centerX - bandWidth, 0, bandWidth * 2, diagLength)
  }
  ctx.restore()

  // Fine grain overlay
  if (grainCanvas) {
    const pattern = ctx.createPattern(grainCanvas, 'repeat')
    if (pattern) {
      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  grainCanvas = buildGrainTile()
  resize()
  window.addEventListener('resize', resize)
  startTime = performance.now()
  animationFrameId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>
