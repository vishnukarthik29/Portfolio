<template>
  <div
    class="bg-white/30 dark:bg-black/30 backdrop-blur-md pt-20 shadow-xl p-5 sm:p-6 md:p-10 min-h-screen"
  >
    <div
      class="max-w-md max-h-full mx-auto p-6 bg-white dark:bg-black/30 shadow-xl rounded-xl mt-15"
    >
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Contact Me</h2>
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
      <form @submit.prevent="sendEmail" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Your Name"
          class="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Your Email"
          class="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          v-model="form.message"
          placeholder="Your Message"
          class="w-full p-3 rounded border h-32 dark:bg-gray-700 dark:text-white"
          required
        ></textarea>
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
      <p v-if="sent" class="text-green-600 dark:text-green-400 mt-4">Message sent successfully!</p>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      sent: false,
      loading: false,
    }
  },
  methods: {
    sendEmail() {
      this.loading = true // Show loader

      const params = {
        name: this.form.name,
        email: this.form.email,
        message: this.form.message,
      }

      const serviceID = 'service_i988i9w'
      const userID = 'HTFS9qX8vFp_ehgL2'

      emailjs
        .send(serviceID, 'template_c3kzieu', params, userID)
        .then(() => {
          return emailjs.send(serviceID, 'template_vgsafat', params, userID)
        })
        .then(() => {
          this.sent = true
          this.form.name = ''
          this.form.email = ''
          this.form.message = ''
        })
        .catch((err) => {
          console.error('Failed to send email:', err)
          alert('Failed to send email. Please try again later.')
        })
        .finally(() => {
          this.loading = false // Hide loader
        })
    },
  },
}
</script>

<style scoped>
input,
textarea {
  border: 1px solid #ccc;
}
</style>
