<template>
  <div class="text-center text-xl font-semibold text-black dark:text-white">
    <i class="bi bi-geo-alt-fill"></i>Chennai, India: {{ istTime }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      istTime: '',
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000) // update every second
  },
  methods: {
    updateTime() {
      const now = new Date()

      // Convert to IST (UTC +5:30)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const istOffset = 5.5 * 60 * 60000
      const istTime = new Date(utc + istOffset)

      // Format time
      const hours = istTime.getHours().toString().padStart(2, '0')
      const minutes = istTime.getMinutes().toString().padStart(2, '0')
      const seconds = istTime.getSeconds().toString().padStart(2, '0')

      this.istTime = `${hours}:${minutes}:${seconds}`
    },
  },
}
</script>

<style scoped></style>
