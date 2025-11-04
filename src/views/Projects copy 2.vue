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

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          View Project →
        </a>
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
  {
    title: 'Watershed Detection',
    description:
      'Advanced computer vision system for watershed segmentation and analysis using ML algorithms.',
    tech: ['Python', 'Streamlit', 'OpenCV'],
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
    link: 'https://github.com/vishnukarthik29/Movie-SQL',
    icons: [
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        alt: 'SQL',
      },
    ],
  },
]
</script>
