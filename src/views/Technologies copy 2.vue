<template>
  <section class="p-6 md:p-8 min-w-screen">
    <h2 class="text-3xl font-bold text-center mb-8 text-black dark:text-white">
      Technologies I Use
    </h2>

    <div class="space-y-6">
      <div
        v-for="category in categories"
        :key="category.name"
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
      >
        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white flex items-center">
          <span class="text-3xl mr-3">{{ category.icon }}</span>
          {{ category.name }}
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="tech in category.technologies"
            :key="tech.name"
            class="bg-[#E8E8E8] dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-3 flex flex-col items-center justify-center text-center"
          >
            <img :src="tech.icon" :alt="tech.name" class="w-10 h-10 mb-2" />
            <h4 class="font-semibold text-sm text-black dark:text-white">{{ tech.name }}</h4>
            <p class="text-xs text-gray-600 dark:text-gray-400">{{ tech.caption }}</p>
          </div>
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
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        caption: 'Progressive framework',
      },
      {
        name: 'HTML5',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        caption: 'Markup language',
      },
      {
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        caption: 'Style sheet language',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        caption: 'Frontend scripting',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        caption: 'Utility-first CSS',
      },
      {
        name: 'Bootstrap',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
        caption: 'CSS toolkit',
      },
      {
        name: 'Vite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
        caption: 'Build tool',
      },
    ],
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    technologies: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        caption: 'JavaScript runtime',
      },
      {
        name: 'Express.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        caption: 'Node.js framework',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        caption: 'General-purpose',
      },
      {
        name: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        caption: 'Programming language',
      },
      {
        name: 'Nginx',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
        caption: 'Web server',
      },
      {
        name: 'XAMPP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
        caption: 'Local server stack',
      },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    technologies: [
      {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        caption: 'Relational database',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        caption: 'NoSQL database',
      },
    ],
  },
  {
    name: 'Data Science & AI/ML',
    icon: '🤖',
    technologies: [
      {
        name: 'NumPy',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
        caption: 'Numerical computing',
      },
      {
        name: 'Pandas',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
        caption: 'Data manipulation',
      },
      {
        name: 'Matplotlib',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg',
        caption: 'Plotting library',
      },
      {
        name: 'Jupyter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
        caption: 'Interactive computing',
      },
      {
        name: 'Power BI',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
        caption: 'Data visualization',
      },
    ],
  },
  {
    name: 'Web Scraping & Automation',
    icon: '🕷️',
    technologies: [
      {
        name: 'Cheerio',
        icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cheerio.svg',
        caption: 'HTML parsing',
      },
      {
        name: 'Puppeteer',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/puppeteer/puppeteer-original.svg',
        caption: 'Chrome automation',
      },
    ],
  },
  {
    name: 'Developer Tools',
    icon: '🛠️',
    technologies: [
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        caption: 'Version control',
      },
      {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        caption: 'Code hosting',
      },
      {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        caption: 'Code editor',
      },
      {
        name: 'npm',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
        caption: 'Package manager',
      },
    ],
  },
]
</script>

<style scoped>
/* Optional custom styles */
</style>
