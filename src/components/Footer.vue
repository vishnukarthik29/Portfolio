<template>
  <footer
    class="text-center py-6 backdrop-blur bg-white/30 dark:bg-black/30 shadow-md transition-all duration-300"
  >
    <p class="text-black dark:text-white inline-block">
      &copy; 2025 Vishnu Karthik.
      <span
        class="text-black dark:text-white border-r-2 border-black dark:border-white animate-cursor ml-2"
      >
        {{ displayedText }}
      </span>
    </p>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const phrases = [
  'All rights reserved.',
  'Crafted with ❤️ using Vue.js.',
  'Building the web, one pixel at a time.',
  'Powered by creativity and caffeine.',
  'Code. Design. Deploy. Repeat.',
]

const displayedText = ref('')
let index = 0
let charIndex = 0
let typing = true

function typeEffect() {
  const current = phrases[index]

  if (typing) {
    if (charIndex < current.length) {
      displayedText.value += current.charAt(charIndex)
      charIndex++
      setTimeout(typeEffect, 80)
    } else {
      typing = false
      setTimeout(typeEffect, 2000) // pause before deleting
    }
  } else {
    if (charIndex > 0) {
      displayedText.value = current.substring(0, charIndex - 1)
      charIndex--
      setTimeout(typeEffect, 40)
    } else {
      typing = true
      index = (index + 1) % phrases.length
      setTimeout(typeEffect, 300)
    }
  }
}

onMounted(() => {
  typeEffect()
})
</script>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.animate-cursor {
  animation: blink 0.8s step-end infinite;
}
</style>
