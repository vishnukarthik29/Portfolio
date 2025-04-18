<template>
  <header class="fixed top-0 w-full z-50 backdrop-blur-sm bg-white/30 dark:bg-black/30 shadow-md">
    <nav class="max-w-screen mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/">
        <h1 class="text-xl font-bold major-mono-display-regular text-black dark:text-white">VK</h1>
      </router-link>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-6 font-medium text-black dark:text-white">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li><router-link to="/about" class="hover:underline">About</router-link></li>
        <li><router-link to="#projects" class="hover:underline">Projects</router-link></li>
        <li><router-link to="#contact" class="hover:underline">Contact</router-link></li>
      </ul>

      <button @click="toggleDarkMode" class="text-xl">
        <span v-if="isDark">🌞</span>
        <span v-else>🌙</span>
      </button>

      <!-- Hamburger Icon -->
      <button @click="toggleMenu" class="md:hidden text-xl focus:outline-none">
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <transition name="fade">
      <ul
        v-if="isOpen"
        class="md:hidden flex flex-col items-center gap-4 py-4 font-medium backdrop-blur-sm bg-white/30 dark:bg-black/30 shadow-md text-black dark:text-white"
      >
        <li><router-link to="/" class="hover:underline" @click="closeMenu">Home</router-link></li>
        <li>
          <router-link to="/about" class="hover:underline" @click="closeMenu">About</router-link>
        </li>
        <li>
          <router-link to="#projects" class="hover:underline" @click="closeMenu"
            >Projects</router-link
          >
        </li>
        <li>
          <router-link to="#contact" class="hover:underline" @click="closeMenu"
            >Contact</router-link
          >
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const isDark = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  // Check localStorage theme on load
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.major-mono-display-regular {
  font-family: 'Major Mono Display', monospace;
  font-weight: 500;
  font-style: normal;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
