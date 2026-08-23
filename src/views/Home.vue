<template>
  <!-- Hero -->
  <section
    id="home"
    class="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-16"
  >
    <div class="max-w-7xl mx-auto w-full">
      <p class="font-mono text-sm tracking-widest text-black/60 dark:text-white/60 mb-4">
        SOFTWARE DEVELOPER
      </p>

      <div class="relative mb-14 sm:mb-8">
        <h1
          class="font-display uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none relative z-10"
        >
          Vishnukarthik
        </h1>
        <h1
          aria-hidden="true"
          class="font-display uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none absolute left-0 top-[0.55em] text-ghost select-none pointer-events-none hidden sm:block"
        >
          Vishnukarthik
        </h1>
      </div>

      <div class="mb-10">
        <div class="font-mono text-lg sm:text-xl leading-relaxed max-w-2xl">
          <p>I build digital experiences that are clean, functional and impactful.</p>
          <p class="mt-4 text-black/60 dark:text-white/60">&gt; Think Build Grow_</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4">
        <a
          href="#projects"
          class="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-mono font-medium hover:opacity-85 transition"
        >
          View My Work <ArrowUpRight class="w-4 h-4" />
        </a>
        <a
          href="#contact"
          class="flex items-center gap-2 px-5 py-3 rounded-lg border border-black/20 dark:border-white/20 font-mono font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          Get In Touch <MessageCircle class="w-4 h-4" />
        </a>
      </div>
    </div>

    <!-- Fixed social rail -->
    <div class="hidden lg:flex flex-col gap-3 fixed left-6 bottom-10 z-40">
      <a
        v-for="social in socials"
        :key="social.label"
        :href="social.href"
        :target="social.href.startsWith('http') ? '_blank' : undefined"
        rel="noopener noreferrer"
        :aria-label="social.label"
        class="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
      >
        <component :is="social.icon" class="w-4 h-4" />
      </a>
    </div>
  </section>

  <!-- Featured Projects preview -->
  <section class="px-6 sm:px-10 lg:px-16 pb-24">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <p class="font-mono text-sm tracking-widest text-black/60 dark:text-white/60">
          FEATURED PROJECTS &gt;_
        </p>
        <a
          href="#projects"
          class="hidden sm:flex items-center gap-1 font-mono text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition"
        >
          View all projects <ArrowUpRight class="w-3.5 h-3.5" />
        </a>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="project in featured"
          :key="project.title"
          :href="project.link || '#projects'"
          :target="project.link ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="group border border-black/10 dark:border-white/10 rounded-xl p-5 hover:border-black/30 dark:hover:border-white/30 transition-colors flex flex-col"
        >
          <h3 class="font-mono font-semibold mb-2">{{ project.title }}</h3>
          <p class="font-mono text-xs text-black/60 dark:text-white/60 mb-6 flex-1">
            {{ project.description }}
          </p>
          <ArrowUpRight
            class="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors"
          />
        </a>
      </div>
    </div>
  </section>

  <div id="about">
    <Aboutme />
  </div>
  <div id="projects">
    <Projects />
  </div>
  <div id="contact">
    <Contact />
  </div>
</template>

<script setup>
import Aboutme from './Aboutme.vue'
import Projects from './Projects.vue'
import Contact from './Contact.vue'
import { Github, Linkedin, Mail, ArrowUpRight, MessageCircle } from 'lucide-vue-next'

const socials = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vishnu-karthik-035260357',
  },
  { icon: Github, label: 'GitHub', href: 'https://github.com/vishnukarthik29' },
  { icon: Mail, label: 'Mail', href: 'mailto:vishnukarthik2912@gmail.com' },
]

const featured = [
  {
    title: 'Stock Price Prediction',
    description: 'Predict future stock prices using Machine Learning with Python and Streamlit.',
    link: 'https://stocklstmbackup.streamlit.app/',
  },
  {
    title: 'PDF Image Overlay Tool',
    description: 'Add watermarks, stamps and images to PDF documents with drag-and-drop.',
    link: 'https://pdf-image-overlay-tool.streamlit.app/',
  },
  {
    title: 'Movie SQL Database',
    description: 'SQL database for managing movie information, reviews and ratings.',
    link: 'https://github.com/vishnukarthik29/Movie-SQL',
  },
  {
    title: 'Http Server',
    description: 'Run your own server, own your data—powered by Python.',
    link: 'https://github.com/vishnukarthik29/http-server-python',
  },
]
</script>
