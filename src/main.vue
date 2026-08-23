<template>
  <div
    class="min-h-screen texture-bg bg-white text-black dark:bg-black dark:text-white transition-colors duration-300"
  >
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
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
