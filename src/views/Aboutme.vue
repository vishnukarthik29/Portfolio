<template>
  <section class="px-6 sm:px-10 lg:px-16 pt-16 pb-20">
    <div class="max-w-6xl mx-auto">
      <p class="font-mono text-sm text-black/60 dark:text-white/60 mb-4">&gt; Get to know me_</p>

      <div class="grid lg:grid-cols-2 gap-10 items-start mb-16">
        <div>
          <h1 class="font-display uppercase text-6xl sm:text-7xl leading-none mb-6">About</h1>
          <p class="font-mono text-lg leading-relaxed mb-4">
            I'm a final year BSc Computer Science student who loves turning ideas into clean,
            functional and impactful digital experiences.
          </p>
          <p class="font-mono text-sm text-black/60 dark:text-white/60">&gt; Think Build Grow_</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-6 items-start">
          <div>
            <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-3">
              WHO I AM
            </p>
            <p class="font-mono text-sm leading-relaxed text-black/80 dark:text-white/80 mb-5">
              I'm passionate about building scalable web applications and solving real-world
              problems. I enjoy thoughtful UI, efficient code and creating products that actually
              make a difference.
            </p>
            <ul class="font-mono text-sm space-y-1.5 text-black/80 dark:text-white/80">
              <li v-for="item in infoList" :key="item.label">
                &gt; {{ item.label }}<span class="inline-block w-24">&nbsp;</span>: {{ item.value }}
              </li>
            </ul>
          </div>

          <div class="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 aspect-4/5">
            <img
              src="../assets/images/vk.png"
              alt="Vishnu Karthik"
              class="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>
      </div>

      <div class="border-t border-black/10 dark:border-white/10 pt-14 grid lg:grid-cols-3 gap-12">
        <!-- Skills -->
        <div>
          <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-5">
            SKILLS
          </p>
          <div v-for="group in skills" :key="group.name" class="mb-6">
            <p class="font-mono text-sm font-semibold mb-2.5">{{ group.name }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in group.items"
                :key="tech"
                class="font-mono text-xs px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/10"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div>
          <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-5">
            EXPERIENCE &amp; JOURNEY
          </p>
          <div class="space-y-6 border-l border-black/10 dark:border-white/10">
            <div v-for="(exp, index) in experiences" :key="index" class="pl-5 relative">
              <span
                class="absolute -left-1.25 top-1.5 w-2 h-2 rounded-full bg-black dark:bg-white"
              ></span>
              <p class="font-mono text-xs text-black/50 dark:text-white/50 mb-1">
                {{ exp.duration }}
              </p>
              <p class="font-mono font-semibold text-sm mb-2">{{ exp.title }}</p>
              <ul class="font-mono text-xs leading-relaxed text-black/70 dark:text-white/70 space-y-1 list-disc list-inside">
                <li v-for="(point, idx) in exp.points" :key="idx">{{ point }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Education + Quote -->
        <div>
          <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-5">
            EDUCATION
          </p>
          <div class="space-y-4 mb-10">
            <div
              v-for="(edu, index) in education"
              :key="index"
              class="border border-black/10 dark:border-white/10 rounded-xl p-4"
            >
              <p class="font-mono font-semibold text-sm">{{ edu.title }}</p>
              <p class="font-mono text-xs text-black/50 dark:text-white/50 mb-1">
                {{ edu.duration }}
              </p>
              <p class="font-mono text-xs text-black/70 dark:text-white/70">
                {{ edu.description }}
              </p>
            </div>
          </div>

          <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-4">
            WHAT DRIVES ME
          </p>
          <blockquote class="font-mono text-sm leading-relaxed text-black/80 dark:text-white/80 border-l-2 border-black/20 dark:border-white/20 pl-4">
            I believe in continuous learning, clean code, and building things that are useful,
            accessible and scalable. Every project is a step towards becoming a better developer
            and human.
          </blockquote>
        </div>
      </div>

      <!-- GitHub Contributions -->
      <div class="border-t border-black/10 dark:border-white/10 mt-14 pt-14">
        <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-5">
          GITHUB CONTRIBUTIONS
        </p>
        <div class="border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <img
            src="https://ghchart.rshah.org/000000/vishnukarthik29"
            alt="GitHub Contribution Chart"
            class="w-full rounded-lg block dark:hidden"
            style="image-rendering: crisp-edges"
          />
          <img
            src="https://ghchart.rshah.org/ffffff/vishnukarthik29"
            alt="GitHub Contribution Chart"
            class="w-full rounded-lg hidden dark:block"
            style="image-rendering: crisp-edges"
          />
          <p class="text-center font-mono text-xs text-black/50 dark:text-white/50 mt-4">
            My GitHub contribution activity
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const infoList = [
  { label: 'Name', value: 'Vishnukarthik' },
  { label: 'Role', value: 'Software Developer' },
  { label: 'Education', value: 'BSc Computer Science' },
  { label: 'Location', value: 'Tamil Nadu, India' },
  { label: 'Email', value: 'vishnukarthik2912@gmail.com' },
  { label: 'Availability', value: 'Open for opportunities' },
]

const skills = [
  { name: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'Vite'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'C++', 'Nginx'] },
  { name: 'Data & ML', items: ['NumPy', 'Pandas', 'Matplotlib', 'Jupyter', 'Power BI'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'MySQL', 'MongoDB'] },
]

const experiences = [
  {
    title: 'Product Engineer | Shomli Interiors',
    duration: 'May 2024 - Present',
    points: [
      'Built and deployed an end-to-end HR, operations, and finance workflow platform (HRM, geo-attendance, purchase requests, AR dashboard, estimation & execution tracking), used daily by 100+ employees, saving 20+ hours/week and improving cross-team decision-making.',
      'Reduced proxy attendance incidents by 80% by deploying a geo-based attendance system with location validation.',
      'Built an end-to-end Purchase Request workflow enabling operations teams to raise material requests and automatically notify accounts via email.',
      'Developed an AR (Accounts Receivable) Dashboard providing real-time visibility into financial and operational metrics.',
    ],
  },
  {
    title: 'Software Developer (Intern) | Nelly Software',
    duration: 'Dec 2023 - Feb 2024',
    points: [
      'Contributed to frontend development using HTML, CSS, and JavaScript, improving UI responsiveness and cross-browser compatibility.',
      'Collaborated with senior developers on debugging, testing, and client-facing feature delivery.',
      'Supported code implementation and presentation to the client.',
    ],
  },
]

const education = [
  {
    title: 'Master of Science | Computer Science',
    duration: 'Nov 2025 - Nov 2027',
    description: 'Anna University - CDE',
  },
  {
    title: 'Bachelor of Science | Computer Science',
    duration: 'June 2021 - May 2024',
    description: 'Ramkrishna Mission - Vivekananda College, Chennai - C.G.P.A: 7.4',
  },
]
</script>
