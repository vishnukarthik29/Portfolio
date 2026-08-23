<template>
  <header class="fixed top-0 w-full z-50 flex justify-center px-4 pt-4">
    <nav
      class="w-full max-w-4xl flex items-center justify-between gap-4 px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/70 dark:bg-black/60 border border-black/10 dark:border-white/10 shadow-lg"
    >
      <a href="#home" class="flex items-center shrink-0" aria-label="Home">
        <img src="/VKP.png" alt="VK logo" class="w-9 h-9 rounded-full dark:invert" />
      </a>

      <!-- Desktop Menu -->
      <ul
        class="hidden md:flex items-center gap-6 font-mono text-sm font-medium text-black dark:text-white"
      >
        <li v-for="link in navLinks" :key="link.id">
          <a :href="`#${link.id}`" class="flex flex-col items-center gap-1 group">
            <span :class="activeSection === link.id ? 'opacity-100' : 'opacity-70'" class="group-hover:opacity-100 transition-opacity">{{
              link.label
            }}</span>
            <span
              class="w-1 h-1 rounded-full bg-black dark:bg-white transition-opacity"
              :class="activeSection === link.id ? 'opacity-100' : 'opacity-0'"
            ></span>
          </a>
        </li>
        <li>
          <a href="/blog/" class="opacity-70 hover:opacity-100 transition-opacity">Blog</a>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <!-- Dark Mode Toggle -->
        <button
          id="dark-mode-toggle"
          @click="toggleDarkMode"
          class="w-9 h-9 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" class="w-4 h-4" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <!-- Hamburger Icon -->
        <button
          id="nav-menu-toggle"
          @click="toggleMenu"
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
          aria-label="Toggle navigation menu"
        >
          <X v-if="isOpen" class="w-4 h-4" />
          <Menu v-else class="w-4 h-4" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <transition name="fade">
      <ul
        v-if="isOpen"
        class="md:hidden absolute top-20 left-4 right-4 flex flex-col items-center gap-4 py-6 font-mono font-medium rounded-3xl backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-black/10 dark:border-white/10 shadow-lg text-black dark:text-white"
      >
        <li v-for="link in navLinks" :key="link.id">
          <a :href="`#${link.id}`" class="hover:underline" @click="closeMenu">{{ link.label }}</a>
        </li>
        <li><a href="/blog/" class="hover:underline">Blog</a></li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Moon, Sun, Menu, X } from 'lucide-vue-next'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const isOpen = ref(false)
const isDark = ref(false)
const activeSection = ref('home')

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const applyDarkMode = (dark) => {
  isDark.value = dark
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleDarkMode = () => {
  applyDarkMode(!isDark.value)
}

const updateActiveSection = () => {
  const markerY = window.scrollY + 200
  let current = navLinks[0].id

  for (const link of navLinks) {
    const el = document.getElementById(link.id)
    if (el && el.offsetTop <= markerY) {
      current = link.id
    }
  }

  activeSection.value = current
}

const syncFromHash = () => {
  const id = window.location.hash.replace('#', '')
  if (navLinks.some((link) => link.id === id)) {
    activeSection.value = id
  }
}

onMounted(() => {
  const now = new Date()
  const hour = now.getHours()

  // Dark mode between 6 PM (18) and 6 AM (6)
  const shouldUseDark = hour >= 18 || hour < 6
  applyDarkMode(shouldUseDark)

  syncFromHash()
  updateActiveSection()
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  window.addEventListener('resize', updateActiveSection)
  window.addEventListener('hashchange', syncFromHash)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateActiveSection)
  window.removeEventListener('hashchange', syncFromHash)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
