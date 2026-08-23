<template>
  <section class="px-6 sm:px-10 lg:px-16 pt-16 pb-20">
    <div class="max-w-6xl mx-auto">
      <p class="font-mono text-sm text-black/60 dark:text-white/60 mb-4">&gt; Things I've built_</p>

      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <h1 class="font-display uppercase text-6xl sm:text-7xl leading-none">Projects</h1>
        <p class="font-mono text-sm text-black/60 dark:text-white/60 max-w-xs">
          A selection of projects where I solved problems, learned deeply and shipped impactful
          solutions.
        </p>
      </div>

      <!-- Filter Buttons -->
      <div
        class="flex flex-wrap gap-6 mb-10 pb-4 border-b border-black/10 dark:border-white/10 font-mono text-sm"
      >
        <button
          @click="selectedFilter = 'All'"
          :class="
            selectedFilter === 'All'
              ? 'font-semibold text-black dark:text-white'
              : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
          "
          class="transition-colors"
        >
          All Projects
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedFilter = category"
          :class="
            selectedFilter === category
              ? 'font-semibold text-black dark:text-white'
              : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
          "
          class="transition-colors"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-6 md:grid-cols-2">
        <a
          v-for="(project, index) in filteredProjects"
          :key="project.title"
          :href="project.link || undefined"
          :target="project.link ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="group border border-black/10 dark:border-white/10 rounded-xl p-6 hover:border-black/30 dark:hover:border-white/30 transition-colors flex flex-col"
        >
          <p class="font-mono text-xs text-black/40 dark:text-white/40 mb-3">
            {{ String(index + 1).padStart(2, '0') }}
          </p>
          <h3 class="font-mono font-semibold text-lg mb-2">
            {{ project.title }}
          </h3>
          <p class="font-mono text-sm text-black/60 dark:text-white/60 mb-4">
            {{ project.description }}
          </p>

          <p class="font-mono text-xs text-black/40 dark:text-white/40 mb-4">
            {{ project.tech.join(' · ') }}
          </p>

          <ArrowUpRight
            class="w-4 h-4 mt-auto text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors"
          />
        </a>
      </div>

      <!-- No Results Message -->
      <div v-if="filteredProjects.length === 0" class="text-center py-12">
        <p class="font-mono text-black/60 dark:text-white/60">
          No projects found in this category.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

const selectedFilter = ref('All')

const projects = [
  {
    title: 'Toon Bulb',
    description: 'Watch anime, movies, cartoons and more',
    tech: ['HTML', 'CSS', 'JS', 'Node.js', 'MongoDB'],
    category: 'Web Development',
    link: 'https://github.com/vishnukarthik29/TOONBULB_WEBSITE',
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
    category: 'Web Development',
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
    category: 'Web Development',
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
    category: 'Web Development',
    link: 'https://github.com/vishnukarthik29/currency_converter',
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
    category: 'Backend',
    link: 'https://github.com/vishnukarthik29/http-server-python',
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
    category: 'Machine Learning',
    link: 'https://stocklstmbackup.streamlit.app/',
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
    title: 'Watershed Detection',
    description:
      'Advanced computer vision system for watershed segmentation and analysis using ML algorithms.',
    tech: ['Python', 'Streamlit', 'OpenCV'],
    category: 'Computer Vision',
    link: 'https://watershed-detection.streamlit.app/',
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
    title: 'Car Number Plate Detection',
    description:
      'Real-time license plate recognition system using computer vision and machine learning.',
    tech: ['Python', 'Streamlit', 'OpenCV', 'OCR'],
    category: 'Computer Vision',
    link: 'https://car-number-plate-detection.streamlit.app/',
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
    title: 'Car Price Prediction',
    description:
      'ML-powered car price estimator analyzing features to predict purchase prices accurately.',
    tech: ['Python', 'Streamlit', 'MachineLearning'],
    category: 'Machine Learning',
    link: 'https://car-price-purchase-pred.streamlit.app/',
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
    title: 'Facial Detection System',
    description: 'Real-time face detection and recognition system using deep learning algorithms.',
    tech: ['Python', 'Streamlit', 'DeepLearning'],
    category: 'Computer Vision',
    link: 'https://facial-detection.streamlit.app/',
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
    title: 'House Price Prediction',
    description:
      'Predict real estate prices using regression models based on property features and location data.',
    tech: ['Python', 'Streamlit', 'MachineLearning'],
    category: 'Machine Learning',
    link: 'https://housepricepredicition.streamlit.app/',
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
    title: 'IMDB Sentiment Analysis',
    description:
      'Analyze movie review sentiments using NLP to classify positive and negative opinions.',
    tech: ['Python', 'Streamlit', 'NLP', 'MachineLearning'],
    category: 'NLP',
    link: 'https://imdb-movie-review-sentinment-analysis.streamlit.app/',
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
    title: 'Live Cricket Churn Prediction',
    description:
      'Predict customer churn patterns in live cricket streaming platforms using ML models.',
    tech: ['Python', 'Streamlit', 'MachineLearning'],
    category: 'Machine Learning',
    link: 'https://livechrunprediction.streamlit.app/',
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
    title: 'PDF Image Overlay Tool',
    description:
      'Add watermarks, stamps, and images to PDF documents with an intuitive drag-and-drop interface.',
    tech: ['Python', 'Streamlit', 'PDF Processing'],
    category: 'Web Development',
    link: 'https://pdf-image-overlay-tool.streamlit.app/',
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
    title: 'Spam Detection App',
    description:
      'Email and SMS spam classifier using NLP and machine learning for accurate filtering.',
    tech: ['Python', 'Streamlit', 'NLP', 'MachineLearning'],
    category: 'NLP',
    link: 'https://spamdetectionapp2912.streamlit.app/',
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
    title: 'Stock Prediction (Linear)',
    description: 'Simple linear regression model for stock price forecasting and trend analysis.',
    tech: ['Python', 'Streamlit', 'MachineLearning'],
    category: 'Machine Learning',
    link: 'https://stockpredictionlinear.streamlit.app/',
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
    title: 'Movie SQL Database',
    description:
      'Comprehensive SQL database project for managing movie information, reviews, and ratings.',
    tech: ['SQL', 'Database Design'],
    category: 'Backend',
    link: 'https://github.com/vishnukarthik29/Movie-SQL',
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        alt: 'SQL',
      },
    ],
  },
]

const categories = computed(() => {
  const cats = [...new Set(projects.map((p) => p.category))]
  return cats.sort()
})

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') {
    return projects
  }
  return projects.filter((p) => p.category === selectedFilter.value)
})
</script>
