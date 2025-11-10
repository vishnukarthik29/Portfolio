<template>
  <section id="home" class="min-h-screen flex items-center justify-center text-center">
    <div class="pt-15">
      <h2 class="text-4xl font-bold mb-4 text-black dark:text-white">Hey, I'm Vishnu Karthik</h2>
      <p class="text-lg text-black dark:text-white mb-6">
        A passionate developer crafting elegant web experiences with a touch of AI and ML
        innovation.
      </p>
      <!-- Social Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <a
          :href="resumeUrl"
          download
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-300 transition"
        >
          <Download class="w-5 h-5" /> Resume
        </a>
        <a
          href="https://www.linkedin.com/in/vishnu-karthik-035260357"
          target="_blank"
          aria-label="LinkediIn"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Linkedin class="w-5 h-5" />
        </a>
        <a
          href="https://github.com/vishnukarthik29"
          target="_blank"
          aria-label="Github"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          href="mailto:vishnukarthik2912@gmail.com"
          aria-label="Mail"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Mail class="w-5 h-5" />
        </a>
        <!-- <a
          href="https://instagram.com/_vk__vinci_"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 bg-[#E8E8E8] dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Instagram class="w-5 h-5" />
        </a> -->
      </div>
      <div class="p-4">
        <Time />
      </div>
      <div class="p-4">
        <Technologies />
      </div>
      <div id="about">
        <Aboutme />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  </section>
</template>

<script setup>
import Time from '../views/Time.vue'
import Technologies from '../views/Technologies.vue'
import Aboutme from './Aboutme.vue'
import Projects from './Projects.vue'
import Contact from './Contact.vue'
const resumeUrl = `${import.meta.env.BASE_URL}vishnukarthik.pdf`
// Lucide Icons
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-vue-next'
</script>
