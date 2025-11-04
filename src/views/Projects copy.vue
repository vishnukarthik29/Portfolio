<template>
  <section
    class="bg-white/30 dark:bg-black/30 backdrop-blur-md pt-20 shadow-xl p-5 sm:p-6 md:p-10 min-h-screen"
  >
    <h2 class="pt-4 text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
      My Projects
    </h2>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.title"
        class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {{ project.title }}
        </h3>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">{{ project.description }}</p>

        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded"
          >
            {{ tech }}
          </span>
        </div>

        <div class="flex gap-3 items-center">
          <img
            v-for="icon in project.icons"
            :key="icon.alt"
            :src="icon.src"
            :alt="icon.alt"
            class="w-6 h-6"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Toon Bulb',
    description: 'Watch anime, movies, cartoons and more',
    tech: ['HTML', 'CSS', 'JS', 'Node.js', 'MongoDB'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        alt: 'HTML',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        alt: 'CSS',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        alt: 'JavaScript',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        alt: 'Node.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        alt: 'MongoDB',
      },
    ],
  },
  {
    title: 'Novel Dojo',
    description: 'Read Manhua and Manga online',
    tech: ['HTML', 'CSS', 'JS'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        alt: 'HTML',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        alt: 'CSS',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        alt: 'JavaScript',
      },
    ],
  },
  {
    title: 'BMI Calculator',
    description: 'Health-conscious app for BMI tracking',
    tech: ['HTML', 'CSS', 'JS'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        alt: 'HTML',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        alt: 'CSS',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        alt: 'JavaScript',
      },
    ],
  },

  {
    title: 'Currency Converter',
    description: 'Convert currency in real time',
    tech: ['Vue', 'Bootstrap', 'Node.js'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        alt: 'Vue.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
        alt: 'Bootstrap',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        alt: 'Node.js',
      },
    ],
  },
  {
    title: 'Http Server',
    description: 'Run your own server, own your data—powered by Python.',
    tech: ['Python'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        alt: 'Python',
      },
    ],
  },
  {
    title: 'Stock Price Prediction',
    description: 'Predict future stock prices using Machine Learning with Python and Streamlit.',
    tech: ['Python', 'Streamlit', 'MachineLearning'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        alt: 'Python',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg',
        alt: 'Streamlit',
      },
    ],
  },
  {
    title: 'Excel Merger',
    description:
      'Merge multiple Excel/CSV files right in the browser — drag & drop, preview, and download a single merged file. No server required.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SheetJS (xlsx)'],
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        alt: 'HTML5',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        alt: 'CSS3',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        alt: 'JavaScript',
      },
    ],
  },
]
</script>
