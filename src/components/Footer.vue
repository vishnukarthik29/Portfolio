<template>
  <footer
    class="text-center py-6 backdrop-blur bg-white/30 dark:bg-black/30 shadow-md transition-all duration-300"
  >
    <p class="text-black dark:text-white inline-block">
      &copy; 2025 VishnuKarthik.
      <span class="text-black dark:text-white ml-2">
        {{ displayedText
        }}<span class="animate-cursor border-r-2 border-black dark:border-white">|</span>
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
let phraseIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    // Delete character
    displayedText.value = currentPhrase.substring(0, charIndex - 1)
    charIndex--

    if (charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      setTimeout(typeWriter, 500) // Pause before typing next phrase
      return
    }
    setTimeout(typeWriter, 50) // Faster deletion
  } else {
    // Type character
    displayedText.value = currentPhrase.substring(0, charIndex + 1)
    charIndex++

    if (charIndex === currentPhrase.length) {
      isDeleting = true
      setTimeout(typeWriter, 2000) // Pause at end of phrase
      return
    }
    setTimeout(typeWriter, 100) // Typing speed
  }
}

onMounted(() => {
  setTimeout(typeWriter, 500) // Initial delay
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
