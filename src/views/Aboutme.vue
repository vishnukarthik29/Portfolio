<template>
  <div class="pt-20 p-4 sm:p-6 md:p-10 min-h-screen">
    <!-- Introduction Section -->
    <div class="text-center px-4 sm:px-8 lg:px-16 mt-10 mb-14">
      <img
        src="../assets/images/vk.png"
        alt="Profile Photo"
        class="mx-auto w-40 h-40 sm:w-40 sm:h-40 rounded-full shadow-lg border-4 border-white object-cover"
      />
      <h1 class="text-2xl sm:text-3xl font-bold mt-4 text-black dark:text-white">
        Hi, I'm Vishnu Karthik
      </h1>
      <p
        class="text-black dark:text-white mt-4 max-w-4xl mx-auto leading-relaxed text-lg font-style-italic sm:text-base"
      >
        A passionate full-stack developer and AI/ML enthusiast with hands-on experience in building
        scalable web applications and real-time dashboards. Currently in my Purusing of M.S.
        Computer Science, I'm constantly learning and building innovative solutions with Vue.js,
        Node.js, Python, and Machine Learning technologies.
      </p>
      <div class="block sm:mt-6 sm:flex sm:justify-center">
        <h3
          class="text-lg sm:text-xl md:text-3xl font-bold mt-6 text-black dark:text-white mx-auto"
        >
          Growth doesn’t happen in the spotlight. It happens in silence, in every late-night
          compile.
        </h3>
      </div>
    </div>

    <!-- Experience Cards -->
    <div class="mb-12 px-4 sm:px-8">
      <h2
        class="text-xl sm:text-2xl font-semibold text-center mb-6 text-blue-700 dark:text-blue-400"
      >
        Experience
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105"
        >
          <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {{ exp.title }}
          </h3>
          <span class="text-sm text-gray-500">{{ exp.duration }}</span>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 text-sm sm:text-base"
          >
            <li v-for="(point, idx) in exp.points" :key="idx">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mb-12 px-4 sm:px-8">
      <h2
        class="text-xl sm:text-2xl font-semibold text-center mb-6 text-purple-700 dark:text-purple-400"
      >
        GitHub Contributions
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
        <div class="w-full">
          <!-- Light Mode (Green) -->
          <img
            src="https://ghchart.rshah.org/8B5CF6/vishnukarthik29"
            alt="GitHub Contribution Chart"
            class="w-full rounded-lg block dark:hidden transition-opacity duration-500"
            style="image-rendering: crisp-edges"
          />

          <!-- Dark Mode (Blue) -->
          <img
            src="https://ghchart.rshah.org/0a4174/vishnukarthik29"
            alt="GitHub Contribution Chart"
            class="w-full rounded-lg hidden dark:block transition-opacity duration-500"
            style="image-rendering: crisp-edges"
          />
        </div>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          My GitHub contribution activity
        </p>
      </div>
    </div>

    <!-- Education Cards -->
    <div class="px-4 sm:px-8">
      <h2
        class="text-xl sm:text-2xl font-semibold text-center mb-6 text-green-700 dark:text-green-400"
      >
        Education
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg transition-transform hover:scale-105"
        >
          <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {{ edu.title }}
          </h3>
          <span class="text-sm text-gray-500">{{ edu.duration }}</span>
          <p class="text-gray-700 dark:text-gray-300 mt-1 text-sm sm:text-base">
            {{ edu.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  data() {
    return {
      experiences: [
        {
          title: 'Product Engineer  | Shomli Interiors',
          duration: 'May 2024 - Present',
          points: [
            'Built and deployed an end-to-end HR, operations, and finance workflow platform (HRM, geo-attendance,purchase requests, AR dashboard, estimation & execution tracking), used daily by 100+ employees, saving 20+hours/week and improving cross-team decision-making.',
            'Reduced proxy attendance incidents by 80% by deploying a geo-based attendance system with locationvalidation, improving on-site compliance across active sites.',
            'Built an end-to-end Purchase Request workflow enabling operations teams to raise material requests andautomatically notify accounts via email, streamlining Purchase Order creation in Tally and reducing manualcoordination.',
            'Developed an AR (Accounts Receivable) Dashboard providing real-time visibility into financial and operational metricsfor management.',
          ],
        },
        // {
        //   title: 'Full-Stack Developer (Freelance) | Shomli Interiors',
        //   duration: 'May 2024 - June 2024',
        //   points: [
        //     'Built a real-time dashboard for the CEO to monitor site updates.',
        //     'Designed intuitive UI to enhance operational visibility.',
        //     'Delivered a modular backend using RESTful APIs for extensibility.',
        //   ],
        // },
        {
          title: 'Software Developer (Intern) | Nelly Software',
          duration: 'Dec 2023 - Feb 2024',
          points: [
            'Contributed to frontend development using HTML, CSS, and JavaScript, improving UI responsiveness and cross-browsercompatibility.',
            'Collaborated with senior developers on debugging, testing, and client-facing feature delivery.',
            'Supported in code implementation and presentation to the client.',
          ],
        },
      ],
      education: [
        {
          title: 'Master of Science | Computer Science',
          duration: 'Nov 2025 - Nov2027 (expected)',
          description: 'Anna Univerisity - CDE',
        },
        {
          title: 'Bachelor of Science | Computer Science',
          duration: 'June 2021 - May 2024',
          description: 'Ramkrishna Mission - Vivekananda College, Chennai - C.G.P.A: 7.4',
        },
        // {
        //   title: 'Higher Secondary Education (Class 12)',
        //   duration: 'June 2020 - May 2021',
        //   description: 'Santhome Higher Secondary School, Chennai - 77%',
        // },
        // {
        //   title: 'Secondary Education (Class 10)',
        //   duration: 'June 2018 - May 2019',
        //   description: 'Santhome Higher Secondary School, Chennai - 70%',
        // },
      ],
    }
  },
}
</script>

<style scoped></style>
