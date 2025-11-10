<template>
  <section class="p-6 md:p-8">
    <h2 class="text-3xl font-bold text-center mb-8 text-black dark:text-white">
      Technologies I Use
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="category in categories"
        :key="category.name"
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
      >
        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white flex items-center">
          <span class="text-3xl mr-3">{{ category.icon }}</span>
          {{ category.name }}
        </h3>

        <div class="flex flex-wrap gap-3">
          <img
            v-for="tech in category.technologies"
            :key="tech.name"
            :src="tech.badge"
            :alt="tech.name"
            class="h-7 transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    name: 'Frontend Development',
    icon: '🎨',
    technologies: [
      {
        name: 'Vue.js',
        badge:
          'https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D',
      },
      {
        name: 'HTML5',
        badge:
          'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
      },
      {
        name: 'CSS3',
        badge:
          'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
      },
      {
        name: 'JavaScript',
        badge:
          'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
      },
      {
        name: 'Tailwind CSS',
        badge:
          'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white',
      },
      {
        name: 'Bootstrap',
        badge:
          'https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white',
      },
      {
        name: 'Vite',
        badge:
          'https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white',
      },
    ],
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    technologies: [
      {
        name: 'Node.js',
        badge:
          'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
      },
      {
        name: 'Express.js',
        badge:
          'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white',
      },
      {
        name: 'Python',
        badge:
          'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
      },
      {
        name: 'C++',
        badge:
          'https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white',
      },
      {
        name: 'Nginx',
        badge:
          'https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white',
      },
      {
        name: 'XAMPP',
        badge:
          'https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white',
      },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    technologies: [
      {
        name: 'MySQL',
        badge:
          'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
      },
      {
        name: 'MongoDB',
        badge:
          'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white',
      },
    ],
  },
  {
    name: 'Data Science & AI/ML',
    icon: '🤖',
    technologies: [
      {
        name: 'NumPy',
        badge:
          'https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white',
      },
      {
        name: 'Pandas',
        badge:
          'https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white',
      },
      {
        name: 'Matplotlib',
        badge:
          'https://img.shields.io/badge/Matplotlib-11557c?style=for-the-badge&logo=python&logoColor=white',
      },
      {
        name: 'Jupyter',
        badge:
          'https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white',
      },
      {
        name: 'Power BI',
        badge:
          'https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black',
      },
    ],
  },
  {
    name: 'Web Scraping & Automation',
    icon: '🕷️',
    technologies: [
      {
        name: 'Cheerio',
        badge:
          'https://img.shields.io/badge/Cheerio-E88C00?style=for-the-badge&logo=javascript&logoColor=white',
      },
      {
        name: 'Puppeteer',
        badge:
          'https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white',
      },
    ],
  },
  {
    name: 'Developer Tools',
    icon: '🛠️',
    technologies: [
      {
        name: 'Git',
        badge:
          'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
      },
      {
        name: 'GitHub',
        badge:
          'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white',
      },
      {
        name: 'VS Code',
        badge:
          'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white',
      },
      {
        name: 'npm',
        badge:
          'https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white',
      },
    ],
  },
]
</script>

<style scoped>
/* Optional custom styles */
</style>
