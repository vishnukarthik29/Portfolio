<template>
  <div
    class="bg-white/30 dark:bg-black/30 backdrop-blur-md pt-20 shadow-xl p-4 sm:p-6 md:p-10 min-h-screen"
  >
    <!-- Introduction Section -->
    <div class="text-center px-4 sm:px-8 lg:px-16 mt-10 mb-14">
      <img
        src="../assets/images/vk.png"
        alt="Profile Photo"
        class="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg border-4 border-white object-cover"
      />
      <h1 class="text-2xl sm:text-3xl font-bold mt-4 text-black dark:text-white">
        Hi, I'm <span class="text-white dark:text-black">Vishnu Karthik</span>
      </h1>
      <p
        class="text-black dark:text-white mt-4 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
      >
        A passionate full-stack developer with hands-on experience in building scalable web
        applications and real-time dashboards. Currently in my final semester of B.Sc Computer
        Science, I'm constantly learning and building cool stuff with Vue.js, Node.js, and more.
      </p>
      <div class="block sm:mt-6 sm:flex sm:justify-center">
        <h3
          class="text-lg sm:text-xl md:text-3xl font-bold mt-6 text-white dark:text-black mx-auto"
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

    <!-- Education Cards -->
    <div class="px-4 sm:px-8">
      <h2
        class="text-xl sm:text-2xl font-semibold text-center mb-6 text-green-700 dark:text-green-400"
      >
        Education
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105"
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
          title: 'Full-Stack Developer  | Shomli Interiors',
          duration: 'July 2024 - Present',
          points: [
            'Developed a Human Resource and Project Management tool, saving over 40 hours per week.',
            'Built a responsive UI using Vue.js and Bootstrap, with Node.js for the backend and MongoDB for the database.',
            'Deployed the application for real-time HR and staff access.',
          ],
        },
        {
          title: 'Full-Stack Developer (Freelance) | Shomli Interiors',
          duration: 'May 2024 - June 2024',
          points: [
            'Built a real-time dashboard for the CEO to monitor site updates.',
            'Designed intuitive UI to enhance operational visibility.',
            'Delivered a modular backend using RESTful APIs for extensibility.',
          ],
        },
        {
          title: 'Assistant Software Developer (Intern) | Nelly Software',
          duration: 'Dec 2023 - Feb 2024',
          points: [
            'Contributed to frontend development using HTML/CSS/JS, improving UI responsiveness.',
            'Collaborated with senior developers to debug, test, and optimize code.',
            'Supported in code implementation and presentation to the client.',
          ],
        },
      ],
      education: [
        {
          title: 'Secondary Education (Class 10)',
          duration: 'June 2018 - May 2019',
          description: 'Santhome Higher Secondary School, Chennai - 70%',
        },
        {
          title: 'Higher Secondary Education (Class 12)',
          duration: 'June 2020 - May 2021',
          description: 'Santhome Higher Secondary School, Chennai - 77%',
        },
        {
          title: 'Bachelor of Science | Computer Science',
          duration: 'June 2021 - May 2024',
          description: 'Ramkrishna Mission - Vivekananda College, Chennai - C.G.P.A: 7.4',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
