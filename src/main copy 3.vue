<template>
  <div
    class="min-h-screen relative overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    @mousemove="handleMouseMove"
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
const mousePos = ref({ x: 0, y: 0 })
const isDark = ref(false)
let animationFrameId = null

const handleMouseMove = (e) => {
  mousePos.value = { x: e.clientX, y: e.clientY }
}

const animate = (canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const dotSpacing = 40
  const dotRadius = 1.5
  const hoverRadius = 150

  for (let x = 0; x < canvas.width; x += dotSpacing) {
    for (let y = 0; y < canvas.height; y += dotSpacing) {
      const distance = Math.sqrt(
        Math.pow(x - mousePos.value.x, 2) + Math.pow(y - mousePos.value.y, 2),
      )

      let opacity = isDark.value ? 0.15 : 0.2
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

  animationFrameId = requestAnimationFrame(() => animate(canvas, ctx))
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  animate(canvas, ctx)

  return () => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}

// Watch for dark mode changes
watch(
  () => document.documentElement.classList.contains('dark'),
  (newVal) => {
    isDark.value = newVal
  },
)

onMounted(() => {
  // Set initial dark mode state
  isDark.value = document.documentElement.classList.contains('dark')

  // Initialize canvas
  const cleanup = initCanvas()

  // Watch for dark mode changes using MutationObserver
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
