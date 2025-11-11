<template>
  <div
    class="min-h-screen relative overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    @mousemove="handleMouseMove"
    ref="containerRef"
  >
    <!-- Interactive Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none"></canvas>

    <!-- Content -->
    <div class="relative z-10">
      <Header />
      <main>
        <RouterView />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const canvasRef = ref(null)
const containerRef = ref(null)
const mousePos = ref({ x: 0, y: 0 })
const isDark = ref(false)
let animationFrameId = null

const handleMouseMove = (e) => {
  mousePos.value = { x: e.clientX, y: e.clientY + window.scrollY }
}

const animate = (canvas, ctx, matrixState) => {
  // Fade old frame slightly for trailing Matrix effect
  ctx.fillStyle = isDark.value ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // MATRIX RAIN EFFECT
  const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおアイウエオ'
  const fontSize = 16
  const columns = Math.floor(canvas.width / fontSize)
  ctx.font = `${fontSize}px monospace`

  // Loop through columns
  for (let i = 0; i < columns; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length))
    const x = i * fontSize
    const y = matrixState.drops[i] * fontSize

    ctx.fillStyle = isDark.value
      ? '#00FF00' // bright green on dark
      : '#009900' // darker green on light
    ctx.fillText(text, x, y)

    // Reset drop randomly after it passes the screen
    if (y > canvas.height && Math.random() > 0.975) {
      matrixState.drops[i] = 0
    }
    matrixState.drops[i]++
  }

  // INTERACTIVE DOT GRID
  const dotSpacing = 40
  const dotRadius = 1.5
  const hoverRadius = 150

  for (let x = 0; x < canvas.width; x += dotSpacing) {
    for (let y = 0; y < canvas.height; y += dotSpacing) {
      const distance = Math.sqrt(
        Math.pow(x - mousePos.value.x, 2) + Math.pow(y - mousePos.value.y, 2),
      )

      let opacity = isDark.value ? 0.1 : 0.2
      let radius = dotRadius

      if (distance < hoverRadius) {
        const factor = 1 - distance / hoverRadius
        opacity = isDark.value ? 0.15 + factor * 0.5 : 0.2 + factor * 0.6
        radius = dotRadius + factor * 3
      }

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = isDark.value ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`
      ctx.fill()
    }
  }

  animationFrameId = requestAnimationFrame(() => animate(canvas, ctx, matrixState))
}

const initCanvas = () => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const ctx = canvas.getContext('2d')

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = Math.max(container.scrollHeight, window.innerHeight)
  }

  resizeCanvas()

  window.addEventListener('resize', resizeCanvas)
  const resizeObserver = new ResizeObserver(resizeCanvas)
  resizeObserver.observe(container)

  // Initialize matrix state
  const matrixState = { drops: [] }
  const fontSize = 16
  const columns = Math.floor(canvas.width / fontSize)
  matrixState.drops = Array(columns).fill(1)

  animate(canvas, ctx, matrixState)

  return () => {
    window.removeEventListener('resize', resizeCanvas)
    resizeObserver.disconnect()
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  }
}

watch(
  () => document.documentElement.classList.contains('dark'),
  (newVal) => {
    isDark.value = newVal
  },
)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  const cleanup = initCanvas()

  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  onUnmounted(() => {
    if (cleanup) cleanup()
    observer.disconnect()
  })
})
</script>
