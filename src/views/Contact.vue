<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto mt-5">
      <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Get In Touch
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Side - Quote -->
        <div class="lg:col-span-1 space-y-6">
          <div
            class="bg-white/80 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div class="mb-6">
              <svg
                class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path
                  d="M10 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3l-2.4 8.3h4.3l3.4-11.7C18.5 12.8 16.9 11 15 11c-.8 0-1.5.3-2 .7C13 10.1 11.6 9 10 9V8zm12 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3l-2.4 8.3h4.3l3.4-11.7C30.5 12.8 28.9 11 27 11c-.8 0-1.5.3-2 .7C25 10.1 23.6 9 22 9V8z"
                />
              </svg>
              <blockquote
                class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 leading-relaxed"
              >
                "The best way to predict the future is to create it."
              </blockquote>
              <p class="text-gray-600 dark:text-gray-400 text-sm">- Peter Drucker</p>
            </div>
          </div>

          <div
            class="bg-white/80 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Info</h3>
            <div class="space-y-4">
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <a
                  href="mailto:vishnukarthik2912@gmail.com"
                  class="flex items-center text-sm hover:underline"
                >
                  <Mail class="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                  <span>vishnukarthik2912@gmail.com</span>
                </a>
              </div>
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <a href="tel:+918668131033" class="flex items-center text-sm hover:underline">
                  <Phone class="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                  <span>+91 8668131033</span>
                </a>
              </div>
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin class="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                <span class="text-sm">Chennai, Tamil Nadu, IN</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Center - Contact Form -->
        <div class="lg:col-span-1">
          <div
            class="bg-white/80 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 class="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Send Message
            </h2>

            <div v-if="loading" class="flex justify-center items-center h-64">
              <svg
                class="animate-spin h-10 w-10 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>

            <div v-if="!loading" class="space-y-4">
              <input
                v-model="form.name"
                type="text"
                placeholder="Your Name"
                class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
              <!-- <input
                v-model="form.country"
                type="text"
                placeholder="Your Country"
                class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              /> -->
              <input
                v-model="form.phoneno"
                type="tel"
                placeholder="Your Phone Number"
                class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
              <input
                v-model="form.email"
                type="email"
                placeholder="Your Email"
                class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
              <textarea
                v-model="form.message"
                placeholder="Your Message"
                class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                required
              ></textarea>
              <button
                @click="handleSubmit"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send class="w-5 h-5" />
                Send Message
              </button>
            </div>

            <div
              v-if="sent"
              class="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg"
            >
              <p class="text-green-700 dark:text-green-400 text-center font-semibold">
                ✓ Message sent successfully!
              </p>
            </div>
          </div>
        </div>

        <!-- Right Side - Social Links -->
        <div class="lg:col-span-1 space-y-6">
          <div
            class="bg-white/80 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h3>
            <div class="space-y-4">
              <a
                v-for="(link, index) in socialLinks"
                :key="index"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:scale-105 hover:shadow-md group"
              >
                <component
                  :is="link.icon"
                  :class="`w-6 h-6 mr-4 ${link.color} group-hover:scale-110 transition`"
                />
                <span class="text-gray-800 dark:text-gray-200 font-medium">{{ link.label }}</span>
              </a>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white"
          >
            <h3 class="text-xl font-bold mb-4">Let's Collaborate!</h3>
            <p class="text-blue-100 text-sm leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import emailjs from 'emailjs-com'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Globe,
  Send,
} from 'lucide-vue-next'

export default {
  name: 'ContactPage',
  components: {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Twitter,
    Instagram,
    Globe,
    Send,
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      country: '',
      phoneno: '',
      message: '',
    })

    const sent = ref(false)
    const loading = ref(false)

    const socialLinks = ref([
      {
        icon: Linkedin,
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/vishnu-karthik-035260357',
        color: 'text-blue-600',
      },
      {
        icon: Github,
        label: 'GitHub',
        url: 'https://github.com/vishnukarthik29',
        color: 'text-gray-800 dark:text-white',
      },
    ])

    const handleSubmit = () => {
      loading.value = true // Show loader

      const params = {
        name: form.value.name,
        email: form.value.email,
        // country: form.value.country,
        phoneno: form.value.phoneno,
        message: form.value.message,
      }

      const serviceID = 'service_i988i9w'
      const userID = 'HTFS9qX8vFp_ehgL2'

      emailjs
        .send(serviceID, 'template_nh8lxc9', params, userID)
        // .then(() => {
        //   return emailjs.send(serviceID, 'template_vgsafat', params, userID)
        // })
        .then(() => {
          sent.value = true
          form.value.name = ''
          form.value.email = ''
          // form.value.country = ''
          form.value.phoneno = ''
          form.value.message = ''

          // Hide success message after 3 seconds
          setTimeout(() => {
            sent.value = false
          }, 3000)
        })
        .catch((err) => {
          console.error('Failed to send email:', err)
          alert('Failed to send email. Please try again later.')
        })
        .finally(() => {
          loading.value = false // Hide loader
        })
    }

    return {
      form,
      sent,
      loading,
      socialLinks,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
