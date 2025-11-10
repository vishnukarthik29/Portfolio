<template>
  <section class="pt-20 p-5 sm:p-6 md:p-10 min-h-screen">
    <h2 class="pt-4 text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
      My Projects
    </h2>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-3 mb-8">
      <button
        @click="selectedFilter = 'All'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all',
          selectedFilter === 'All'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
        ]"
      >
        All Projects ({{ projects.length }})
      </button>
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedFilter = category"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all',
          selectedFilter === category
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
        ]"
      >
        {{ category }} ({{ getProjectCountByCategory(category) }})
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="project in filteredProjects"
        :key="project.title"
        class="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ project.title }}
        </h3>
        <p class="text-xs text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-3">
          <span
            v-for="tech in project.tech.slice(0, 3)"
            :key="tech"
            class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-0.5 rounded"
          >
            {{ tech }}
          </span>
          <span
            v-if="project.tech.length > 3"
            class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded"
          >
            +{{ project.tech.length - 3 }}
          </span>
        </div>

        <div class="flex gap-2 items-center mb-3">
          <img
            v-for="icon in project.icons.slice(0, 4)"
            :key="icon.alt"
            :src="icon.src"
            :alt="icon.alt"
            class="w-5 h-5"
            loading="lazy"
          />
        </div>

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          View Project →
        </a>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400 text-lg">No projects found in this category.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

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

const getProjectCountByCategory = (category) => {
  return projects.filter((p) => p.category === category).length
}
</script>
