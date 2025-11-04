<template>
  <section class="p-6 md:p-10 min-h-screen">
    <h2 class="text-3xl font-bold text-center mb-10 text-black dark:text-white">
      Technologies I Use
    </h2>
    <div class="grid grid-cols-1 m:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div
        v-for="tech in technologies"
        :key="tech.name"
        class="bg-[#E8E8E8] dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center justify-center text-center"
      >
        <img :src="tech.icon" :alt="tech.name" class="w-12 h-12 mb-3" />
        <h3 class="font-semibold text-lg text-black dark:text-white">{{ tech.name }}</h3>
        <p class="text-sm text-black dark:text-white">{{ tech.caption }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const technologies = [
  {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    caption: 'Progressive frontend framework',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    caption: 'Backend JavaScript runtime',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    caption: 'Utility-first CSS framework',
  },
  {
    name: 'Bootstrap',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    caption: 'Responsive CSS toolkit',
  },
  {
    name: 'XAMPP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    caption: 'Local server stack',
  },
  {
    name: 'Express.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    caption: 'Minimal Node.js framework',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    caption: 'Version control system',
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    caption: 'Code hosting platform',
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
    name: 'VS Code',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    caption: 'Code editor',
  },
  {
    name: 'npm',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    caption: 'Node package manager',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    caption: 'Frontend scripting',
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    caption: 'General-purpose language',
  },
  //   {
  //     name: 'Excel',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg', // May need a custom icon
  //     caption: 'Spreadsheet analysis',
  //   },
  {
    name: 'Power BI',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', // Custom URL
    caption: 'Data visualization tool',
  },
  {
    name: 'MY SQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    caption: 'Relational database language',
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    caption: 'NoSQL database',
  },
  {
    name: 'Vite',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    caption: 'Frontend build tool',
  },
  {
    name: 'Nginx',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    caption: 'High-performance web server',
  },
  {
    name: 'Jupyter',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    caption: 'Notebook for interactive computing',
  },
  {
    name: 'C++',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    caption: 'General-purpose programming language',
  },
  {
    name: 'NumPy',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    caption: 'Numerical computing with Python',
  },
  {
    name: 'Pandas',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    caption: 'Data manipulation in Python',
  },
  {
    name: 'Cheerio',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cheerio.svg', // May need custom upload
    caption: 'jQuery-like HTML parsing for Node.js',
  },
  {
    name: 'Puppeteer',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/puppeteer/puppeteer-original.svg', // Not a simpleicons icon, custom URL
    caption: 'Headless Chrome automation',
  },
  {
    name: 'Matplotlib',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg', // Custom
    caption: 'Python plotting library',
  },
]
</script>

<style scoped>
/* Optional custom styles */
</style>
