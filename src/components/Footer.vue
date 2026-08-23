<template>
  <footer
    class="font-mono text-xs sm:text-sm border-t border-black/10 dark:border-white/10 px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-black/70 dark:text-white/70"
  >
    <p>&copy; {{ year }} Vishnukarthik.</p>
    <p>
      Built with Vue &amp; Tailwind
      <span class="text-red-500">&hearts;</span>
    </p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
