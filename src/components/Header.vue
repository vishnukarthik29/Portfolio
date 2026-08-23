<template>
  <nav
    class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-3rem)] md:w-auto"
    aria-label="Main navigation"
  >
    <div
      class="backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-gray-800/30 dark:border-white/30 rounded-full px-8 sm:px-12 shadow-lg"
    >
      <div class="flex justify-between items-center h-14">
        <div class="flex-shrink-0">
          <a href="#home" class="flex items-center" aria-label="Back to top">
            <!-- Uppercase on purpose: Major Mono Display maps its geometric display
                 glyphs to the capitals; the lowercase ones are plain thin letterforms. -->
            <span class="font-logo text-2xl leading-none select-none">VK</span>
          </a>
        </div>

        <!-- Desktop -->
        <div class="hidden md:flex md:items-center ml-8">
          <ul class="flex items-baseline space-x-2">
            <li v-for="link in navLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="relative block px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-300 group"
                :aria-current="activeSection === link.id ? 'page' : undefined"
              >
                <span class="block overflow-hidden relative whitespace-nowrap">
                  <span
                    class="block translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[125%] group-hover:skew-y-8"
                    >{{ link.label }}</span
                  >
                  <span
                    class="absolute top-0 left-0 translate-y-[125%] skew-y-8 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0"
                    aria-hidden="true"
                    >{{ link.label }}</span
                  >
                </span>
                <span
                  class="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full bg-current transition-opacity duration-300"
                  :class="activeSection === link.id ? 'opacity-100' : 'opacity-0'"
                ></span>
              </a>
            </li>
            <li>
              <a
                href="/blog/"
                class="relative block px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-300 group"
              >
                <span class="block overflow-hidden relative whitespace-nowrap">
                  <span
                    class="block translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[125%] group-hover:skew-y-8"
                    >Blog</span
                  >
                  <span
                    class="absolute top-0 left-0 translate-y-[125%] skew-y-8 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0"
                    aria-hidden="true"
                    >Blog</span
                  >
                </span>
              </a>
            </li>
          </ul>
          <div class="ml-8">
            <ThemeToggle :dark="isDark" @toggle="toggleDarkMode" />
          </div>
        </div>

        <!-- Mobile -->
        <div class="md:hidden ml-4 flex items-center gap-2">
          <ThemeToggle :dark="isDark" @toggle="toggleDarkMode" />
          <button
            class="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-all relative w-9 h-9 flex items-center justify-center"
            :aria-label="isMenuOpen || isClosing ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMenuOpen || isClosing"
            @click="handleMenuToggle"
          >
            <span class="sr-only">{{ isMenuOpen || isClosing ? 'Close' : 'Open' }} menu</span>
            <div class="flex flex-col justify-between w-6 h-5">
              <span
                class="block h-[2px] w-full bg-current transform transition-all duration-300 ease-in-out"
                :class="isBurgerAnimated ? 'rotate-45 translate-y-[9px]' : 'rotate-0 translate-y-0'"
              />
              <span
                class="block h-[2px] w-full bg-current transition-all duration-300 ease-in-out"
                :class="isBurgerAnimated ? 'opacity-0 translate-x-6' : 'opacity-100 translate-x-0'"
              />
              <span
                class="block h-[2px] w-full bg-current transform transition-all duration-300 ease-in-out"
                :class="
                  isBurgerAnimated ? '-rotate-45 -translate-y-[9px]' : 'rotate-0 translate-y-0'
                "
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div
    v-if="isMenuOpen"
    class="md:hidden fixed inset-0 z-40 bg-gray-50 dark:bg-[#101010]"
    :class="isClosing ? 'animate-fade-out' : 'animate-fade-in'"
    role="menu"
    aria-label="Mobile menu"
  >
    <div
      class="flex flex-col items-center justify-center h-screen"
      :class="isClosing ? 'animate-slide-down' : 'animate-slide-up'"
    >
      <ul class="space-y-8 text-center">
        <li
          v-for="(link, i) in navLinks"
          :key="link.id"
          role="none"
          :class="`animate-fade-in-delay-${i + 1}`"
        >
          <a
            :href="`#${link.id}`"
            class="text-3xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 inline-block"
            role="menuitem"
            @click="handleLinkClick"
            >{{ link.label }}</a
          >
        </li>
        <li role="none" :class="`animate-fade-in-delay-${navLinks.length + 1}`">
          <a
            href="/blog/"
            class="text-3xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 inline-block"
            role="menuitem"
            >Blog</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const isMenuOpen = ref(false)
const isClosing = ref(false)
const isBurgerAnimated = ref(false)
const isDark = ref(false)
const activeSection = ref('home')

const lockScroll = (locked) => {
  document.body.style.overflow = locked ? 'hidden' : 'unset'
  document.documentElement.style.overflow = locked ? 'hidden' : 'unset'
}

const handleMenuToggle = () => {
  if (isMenuOpen.value) {
    isClosing.value = true
    isBurgerAnimated.value = false
    setTimeout(() => {
      isMenuOpen.value = false
      isClosing.value = false
      lockScroll(false)
    }, 300)
  } else {
    isMenuOpen.value = true
    isBurgerAnimated.value = true
    isClosing.value = false
    lockScroll(true)
  }
}

const handleLinkClick = () => {
  isClosing.value = true
  isBurgerAnimated.value = false
  setTimeout(() => {
    isMenuOpen.value = false
    isClosing.value = false
    lockScroll(false)
  }, 300)
}

const applyDarkMode = (dark) => {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

const toggleDarkMode = () => {
  const next = !isDark.value
  // Circular wipe between themes where the browser supports it.
  if (document.startViewTransition) {
    document.startViewTransition(() => applyDarkMode(next))
  } else {
    applyDarkMode(next)
  }
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
  // Light is the default; dark only when the visitor has chosen it before.
  applyDarkMode(localStorage.getItem('theme') === 'dark')

  syncFromHash()
  updateActiveSection()
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  window.addEventListener('resize', updateActiveSection)
  window.addEventListener('hashchange', syncFromHash)
})

onUnmounted(() => {
  lockScroll(false)
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateActiveSection)
  window.removeEventListener('hashchange', syncFromHash)
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-fade-out {
  animation: fade-out 0.3s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

.animate-fade-in-delay-1 {
  animation: slide-up 0.4s ease-out 0.1s backwards;
}

.animate-fade-in-delay-2 {
  animation: slide-up 0.4s ease-out 0.2s backwards;
}

.animate-fade-in-delay-3 {
  animation: slide-up 0.4s ease-out 0.3s backwards;
}

.animate-fade-in-delay-4 {
  animation: slide-up 0.4s ease-out 0.4s backwards;
}

.animate-fade-in-delay-5 {
  animation: slide-up 0.4s ease-out 0.5s backwards;
}
</style>
