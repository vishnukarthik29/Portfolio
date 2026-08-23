<template>
  <div class="min-h-screen text-black dark:text-white transition-colors duration-300">
    <ShaderBackdrop />
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
import ShaderBackdrop from '@/components/ShaderBackdrop.vue'
</script>
