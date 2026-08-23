<template>
  <label :for="inputId" class="themeToggle st-sunMoonThemeToggleBtn">
    <input
      :id="inputId"
      type="checkbox"
      class="themeToggleInput"
      :checked="dark"
      :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
      @change="emit('toggle')"
    />
    <svg width="28" height="28" viewBox="0 0 20 20" fill="currentColor" stroke="none">
      <mask :id="maskId">
        <rect x="0" y="0" width="20" height="20" fill="white" />
        <circle cx="11" cy="3" r="8" fill="black" />
      </mask>
      <circle class="sunMoon" cx="10" cy="10" r="8" :mask="`url(#${maskId})`" />
      <g>
        <circle class="sunRay sunRay1" cx="18" cy="10" r="1.5" />
        <circle class="sunRay sunRay2" cx="14" cy="16.928" r="1.5" />
        <circle class="sunRay sunRay3" cx="6" cy="16.928" r="1.5" />
        <circle class="sunRay sunRay4" cx="2" cy="10" r="1.5" />
        <circle class="sunRay sunRay5" cx="6" cy="3.1718" r="1.5" />
        <circle class="sunRay sunRay6" cx="14" cy="3.1718" r="1.5" />
      </g>
    </svg>
  </label>
</template>

<script setup>
import { useId, computed } from 'vue'

defineProps({
  dark: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])

// Rendered in both the desktop and mobile bars, so the mask needs a unique id.
const uid = useId()
const inputId = computed(() => `themeToggle-${uid}`)
const maskId = computed(() => `moon-mask-${uid}`)
</script>

<style scoped>
.themeToggle {
  color: currentColor;
  width: 1.5rem;
  height: 1.5rem;
}

.st-sunMoonThemeToggleBtn {
  position: relative;
  cursor: pointer;
  display: block;
  transition: transform 0.3s ease;
}

.st-sunMoonThemeToggleBtn:hover {
  transform: rotate(-15deg);
}

.st-sunMoonThemeToggleBtn .themeToggleInput {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}

.st-sunMoonThemeToggleBtn svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
  transform: rotate(40deg);
}

.st-sunMoonThemeToggleBtn svg .sunMoon {
  transform-origin: center center;
  transition: transform 0.4s ease;
  transform: scale(1);
}

.st-sunMoonThemeToggleBtn svg .sunRay {
  transform-origin: center center;
  transform: scale(0);
}

.st-sunMoonThemeToggleBtn svg mask > circle {
  transition: transform 0.64s cubic-bezier(0.41, 0.64, 0.32, 1.575);
  transform: translate(0px, 0px);
}

.st-sunMoonThemeToggleBtn svg .sunRay2 {
  animation-delay: 0.05s !important;
}
.st-sunMoonThemeToggleBtn svg .sunRay3 {
  animation-delay: 0.1s !important;
}
.st-sunMoonThemeToggleBtn svg .sunRay4 {
  animation-delay: 0.17s !important;
}
.st-sunMoonThemeToggleBtn svg .sunRay5 {
  animation-delay: 0.25s !important;
}
.st-sunMoonThemeToggleBtn svg .sunRay6 {
  animation-delay: 0.29s !important;
}

.st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg {
  transform: rotate(90deg);
}
.st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg mask > circle {
  transform: translate(16px, -3px);
}
.st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg .sunMoon {
  transform: scale(0.55);
}
.st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg .sunRay {
  animation: showRay1832 0.4s ease 0s 1 forwards;
}

@keyframes showRay1832 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .st-sunMoonThemeToggleBtn,
  .st-sunMoonThemeToggleBtn svg,
  .st-sunMoonThemeToggleBtn svg .sunMoon,
  .st-sunMoonThemeToggleBtn svg mask > circle {
    transition: none;
  }
}
</style>
