<template>
  <section id="home" class="min-h-screen flex items-center justify-center text-center">
    <div class="bg-white/30 dark:bg-black/30 backdrop-blur-md pt-15 shadow-xl">
      <h2 class="text-4xl font-bold mb-4">
        Hey, I'm <span class="text-black dark:text-white">Vishnu Karthik</span>
      </h2>
      <p class="text-lg text-black dark:text-white mb-6">
        A passionate developer crafting elegant web experiences.
      </p>
      <!-- Social Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <a
          href="/vishnukarthik.pdf"
          download
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-300 transition"
        >
          <Download class="w-5 h-5" /> Resume
        </a>
        <a
          href="https://www.linkedin.com/in/vishnu-karthik-035260357"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Linkedin class="w-5 h-5" />
        </a>
        <a
          href="https://github.com/vishnukarthik29"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          href="mailto:vishnukarthik2912@gmail.com"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Mail class="w-5 h-5" />
        </a>
        <a
          href="https://instagram.com/_vk__vinci_"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Instagram class="w-5 h-5" />
        </a>
      </div>
      <div class="p-4">
        <Time />
      </div>
      <div class="p-4">
        <Technologies />
      </div>
    </div>
  </section>
</template>

<script setup>
import Time from '../views/Time.vue'
import Technologies from '../views/Technologies.vue'
// Lucide Icons
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-vue-next'
</script>
