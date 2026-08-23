<template>
  <section class="px-6 sm:px-10 lg:px-16 pt-16 pb-20">
    <div class="max-w-6xl mx-auto">
      <p class="font-mono text-sm text-black/60 dark:text-white/60 mb-4">&gt; Let's connect_</p>

      <div class="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h1 class="font-display uppercase text-6xl sm:text-7xl leading-none mb-6">Contact</h1>
          <p class="font-mono text-lg leading-relaxed mb-4">
            Have a project in mind or just want to say hi? I'm always open to discussing new
            ideas, opportunities and collaborations.
          </p>
          <p class="font-mono text-sm text-black/60 dark:text-white/60">&gt; Think Build Grow_</p>
        </div>

        <div>
          <p class="font-mono text-xs tracking-widest text-black/60 dark:text-white/60 mb-4">
            SEND A MESSAGE
          </p>

          <div v-if="loading" class="flex justify-center items-center h-64">
            <Loader2 class="w-8 h-8 animate-spin text-black/50 dark:text-white/50" />
          </div>

          <form v-else class="space-y-4" @submit.prevent="handleSubmit">
            <div class="grid sm:grid-cols-2 gap-4">
              <input
                v-model="form.name"
                type="text"
                placeholder="Your Name"
                required
                class="w-full p-3 rounded-lg border border-black/15 dark:border-white/15 bg-transparent font-mono text-sm placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition"
              />
              <input
                v-model="form.email"
                type="email"
                placeholder="Your Email"
                required
                class="w-full p-3 rounded-lg border border-black/15 dark:border-white/15 bg-transparent font-mono text-sm placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition"
              />
            </div>
            <input
              v-model="form.subject"
              type="text"
              placeholder="Subject"
              class="w-full p-3 rounded-lg border border-black/15 dark:border-white/15 bg-transparent font-mono text-sm placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition"
            />
            <textarea
              v-model="form.message"
              placeholder="Your Message"
              rows="5"
              required
              class="w-full p-3 rounded-lg border border-black/15 dark:border-white/15 bg-transparent font-mono text-sm placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition resize-none"
            ></textarea>
            <button
              type="submit"
              class="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-mono font-medium hover:opacity-85 transition"
            >
              Send Message <ArrowUpRight class="w-4 h-4" />
            </button>

            <p v-if="sent" class="font-mono text-sm text-green-600 dark:text-green-400">
              &check; Message sent successfully!
            </p>
          </form>
        </div>
      </div>

      <div
        class="border-t border-black/10 dark:border-white/10 pt-12 grid sm:grid-cols-3 gap-10 font-mono text-sm"
      >
        <div>
          <p class="text-xs tracking-widest text-black/60 dark:text-white/60 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
            GET IN TOUCH
          </p>
          <div class="space-y-4">
            <a href="mailto:vishnukarthik2912@gmail.com" class="flex items-start gap-3 hover:opacity-70 transition">
              <Mail class="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                vishnukarthik2912@gmail.com
                <span class="block text-xs text-black/50 dark:text-white/50">For project inquiries</span>
              </span>
            </a>
            <a href="tel:+918668131033" class="flex items-start gap-3 hover:opacity-70 transition">
              <Phone class="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                +91 86681 31033
                <span class="block text-xs text-black/50 dark:text-white/50">Available on WhatsApp</span>
              </span>
            </a>
            <div class="flex items-start gap-3">
              <MapPin class="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Tamil Nadu, India
                <span class="block text-xs text-black/50 dark:text-white/50">Available for remote work</span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <p class="text-xs tracking-widest text-black/60 dark:text-white/60 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
            LET'S COLLABORATE
          </p>
          <p class="text-black/70 dark:text-white/70 leading-relaxed mb-4">
            I'm currently open to freelance projects, internships and full-time opportunities. If
            you have an idea, let's build something impactful together.
          </p>
          <a href="#projects" class="inline-flex items-center gap-1 font-medium hover:opacity-70 transition">
            View My Work <ArrowUpRight class="w-3.5 h-3.5" />
          </a>
        </div>

        <div>
          <p class="text-xs tracking-widest text-black/60 dark:text-white/60 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
            REACH ME ON
          </p>
          <div class="space-y-4">
            <a
              href="https://www.linkedin.com/in/vishnu-karthik-035260357"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-3 hover:opacity-70 transition"
            >
              <Linkedin class="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                LinkedIn
                <span class="block text-xs text-black/50 dark:text-white/50">linkedin.com/in/vishnu-karthik-035260357</span>
              </span>
            </a>
            <a
              href="https://github.com/vishnukarthik29"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-3 hover:opacity-70 transition"
            >
              <Github class="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                GitHub
                <span class="block text-xs text-black/50 dark:text-white/50">github.com/vishnukarthik29</span>
              </span>
            </a>
            <a href="mailto:vishnukarthik2912@gmail.com" class="flex items-start gap-3 hover:opacity-70 transition">
              <Mail class="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Email
                <span class="block text-xs text-black/50 dark:text-white/50">vishnukarthik2912@gmail.com</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from 'emailjs-com'
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight, Loader2 } from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const sent = ref(false)
const loading = ref(false)

const handleSubmit = () => {
  loading.value = true

  const params = {
    name: form.value.name,
    email: form.value.email,
    subject: form.value.subject,
    message: form.value.message,
  }

  const serviceID = 'service_i988i9w'
  const userID = 'HTFS9qX8vFp_ehgL2'

  emailjs
    .send(serviceID, 'template_nh8lxc9', params, userID)
    .then(() => {
      sent.value = true
      form.value = { name: '', email: '', subject: '', message: '' }

      setTimeout(() => {
        sent.value = false
      }, 3000)
    })
    .catch((err) => {
      console.error('Failed to send email:', err)
      alert('Failed to send email. Please try again later.')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
