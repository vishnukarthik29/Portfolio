<template>
  <div class="blog-root" @mousemove="onMouseMove">
    <canvas ref="canvasRef" class="dot-canvas"></canvas>

    <div class="blog-content">

      <!-- Hero -->
      <div class="blog-hero">
        <h1 class="blog-title">Engineering Notes</h1>
        <p class="blog-subtitle">Systems. Capital. Structural Power.</p>
        <p class="blog-tagline">Essays dissecting markets, software, and the invisible leverage behind durable advantage.</p>
        <div class="blog-hero-actions">
          <a href="/blog/openclaw.html" class="btn-primary">Read Latest Essay</a>
          <a href="https://vishnukarthik.me/" class="btn-secondary">Back to Portfolio</a>
        </div>
      </div>

      <!-- Thesis -->
      <div class="blog-section">
        <h2 class="section-heading">Thesis</h2>
        <div class="thesis-block">
          <p>Most commentary explains events.<br>This space dissects structure.</p>
          <p>Technology companies are not products — they are constraint systems.<br>
          Markets are not prices — they are power maps.<br>
          Architecture is not code — it is leverage encoded.</p>
          <p>This archive exists to trace those fault lines.</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div class="blog-section">
        <h2 class="section-heading">Latest Writing</h2>
        <div class="posts-grid">
          <a v-for="post in posts" :key="post.slug" :href="`/blog/${post.slug}.html`" class="post-card">
            <div class="post-card-inner">
              <span class="post-date">{{ post.date }}</span>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-desc">{{ post.desc }}</p>
              <span class="post-read">Read Essay →</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Quote -->
      <div class="blog-quote">
        <blockquote>Durable advantage is rarely loud.<br>It hides in constraints others cannot replicate.</blockquote>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const mouse = ref({ x: -999, y: -999 })
let raf = null

const posts = [
  { slug: 'openclaw',             date: 'Mar 16, 2026', title: 'OpenClaw Is What Happens When Personal AI Escapes the Walled Garden',  desc: 'A lobster, your machine, and the structural reason every major AI lab failed to build this.' },
  { slug: 'pentagon',             date: 'Mar 11, 2026', title: "The Pentagon Went to War with Anthropic. What's Really at Stake?",       desc: 'A $200M contract, a supply chain risk designation, and the question no one wants to answer.' },
  { slug: 'anthropic',            date: 'Mar 06, 2026', title: "Anthropic Isn't Building a Chatbot. It's Building Infrastructure.",      desc: 'Constitutional AI, 1M context, and the quiet construction of an enterprise moat.' },
  { slug: 'ai-agent-architecture', date: 'Mar 01, 2026', title: 'The Architecture of an Autonomous AI Agent',                           desc: 'Planner, Executor, Memory — the three-layer pattern behind every serious agentic system.' },
  { slug: 'nvidia',               date: 'Jan 22, 2026', title: "NVIDIA Isn't Waiting for the Future. It's Shipping It.",                 desc: 'Rubin is in production.' },
  { slug: 'asml',                 date: 'Jan 21, 2026', title: "ASML's Moat Isn't Gone. But It's No Longer Untouchable.",               desc: 'On lithography dominance, China exposure, and erosion of structural invincibility.' },
]

const onMouseMove = (e) => {
  mouse.value = { x: e.clientX, y: e.clientY }
}

const isDark = () => document.documentElement.classList.contains('dark')

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const spacing = 40
  const dark = isDark()
  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {
      const dist = Math.hypot(x - mouse.value.x, y - mouse.value.y)
      const factor = Math.max(0, 1 - dist / 150)
      const opacity = dark ? 0.15 + factor * 0.5 : 0.2 + factor * 0.6
      const radius = 1.5 + factor * 3
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = dark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
      ctx.fill()
    }
  }
  raf = requestAnimationFrame(draw)
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  draw()
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.blog-root {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.dot-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blog-content {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px 60px;
}

/* Hero */
.blog-hero {
  text-align: center;
  padding: 60px 0 48px;
}

.blog-title {
  font-family: 'Major Mono Display', monospace;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.blog-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.blog-tagline {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 520px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.blog-hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 10px 24px;
  background: #2563eb;
  color: #fff !important;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none !important;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
}
.btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }

.btn-secondary {
  padding: 10px 24px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1) !important;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none !important;
  transition: background 0.2s, transform 0.2s;
  border: 1px solid var(--vp-c-divider);
}
.btn-secondary:hover { background: var(--vp-c-bg-mute); transform: translateY(-1px); }

/* Sections */
.blog-section { margin-bottom: 56px; }

.section-heading {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Thesis */
.thesis-block {
  background: var(--vp-c-bg-soft);
  border-left: 3px solid #2563eb;
  border-radius: 0 8px 8px 0;
  padding: 20px 24px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  font-size: 0.95rem;
}
.thesis-block p { margin: 0 0 12px; }
.thesis-block p:last-child { margin-bottom: 0; }

/* Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  display: block;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}

.post-card-inner {
  padding: 20px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.post-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: 'Major Mono Display', monospace;
  letter-spacing: 1px;
}

.post-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1) !important;
  line-height: 1.4;
  margin: 0;
}

.post-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.post-read {
  font-size: 0.82rem;
  font-weight: 600;
  color: #2563eb;
  margin-top: 4px;
}

/* Quote */
.blog-quote {
  text-align: center;
  padding: 40px 0 20px;
  border-top: 1px solid var(--vp-c-divider);
}
.blog-quote blockquote {
  font-style: italic;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.8;
  border: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 640px) {
  .posts-grid { grid-template-columns: 1fr; }
  .blog-hero { padding: 40px 0 32px; }
}
</style>
