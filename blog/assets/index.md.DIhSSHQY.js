import{v as m,x as f,c as y,o as w,j as a}from"./chunks/framework.B_12YdRm.js";const M=JSON.parse('{"title":"Blog","description":"","frontmatter":{"layout":"page","title":"Blog"},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),x={name:"index.md"},P=Object.assign(x,{setup(E){return m(()=>{const s=document.getElementById("dot-canvas");if(!s)return;const n=s.getContext("2d");let i={x:-999,y:-999},l;const g=()=>document.documentElement.classList.contains("dark"),r=()=>{s.width=window.innerWidth,s.height=window.innerHeight},d=()=>{n.clearRect(0,0,s.width,s.height);const t=40,h=g();for(let e=0;e<s.width;e+=t)for(let o=0;o<s.height;o+=t){const v=Math.hypot(e-i.x,o-i.y),c=Math.max(0,1-v/150),u=h?.15+c*.5:.2+c*.6,b=1.5+c*3;n.beginPath(),n.arc(e,o,b,0,Math.PI*2),n.fillStyle=h?`rgba(255,255,255,${u})`:`rgba(0,0,0,${u})`,n.fill()}l=requestAnimationFrame(d)},p=t=>{i={x:t.clientX,y:t.clientY}};r(),window.addEventListener("resize",r),window.addEventListener("mousemove",p),d(),f(()=>{cancelAnimationFrame(l),window.removeEventListener("resize",r),window.removeEventListener("mousemove",p)})}),(s,n)=>(w(),y("div",null,[...n[0]||(n[0]=[a("div",{class:"blog-root"},[a("canvas",{id:"dot-canvas"}),a("div",{class:"blog-content"},[a("pre",null,[a("code",null,`<div class="blog-hero">
  <h1 class="blog-title">Engineering Notes</h1>
  <p class="blog-subtitle">Systems. Capital. Structural Power.</p>
  <p class="blog-tagline">Essays dissecting markets, software, and the invisible leverage behind durable advantage.</p>
  <div class="blog-hero-actions">
    <a href="/Portfolio/blog/openclaw" class="btn-primary">Read Latest Essay</a>
    <a href="https://vishnukarthik29.github.io/Portfolio/" class="btn-secondary">Back to Portfolio</a>
  </div>
</div>

<div class="blog-section">
  <h2 class="section-heading">Thesis</h2>
  <div class="thesis-block">
    <p>Most commentary explains events.<br>This space dissects structure.</p>
    <p>Technology companies are not products — they are constraint systems.<br>Markets are not prices — they are power maps.<br>Architecture is not code — it is leverage encoded.</p>
    <p>This archive exists to trace those fault lines.</p>
  </div>
</div>

<div class="blog-section">
  <h2 class="section-heading">Latest Writing</h2>
  <div class="posts-grid">

    <a href="/Portfolio/blog/openclaw" class="post-card">
      <div class="post-card-inner">
        <span class="post-date">Mar 16, 2026</span>
        <h3 class="post-title">OpenClaw Is What Happens When Personal AI Escapes the Walled Garden</h3>
        <p class="post-desc">A lobster, your machine, and the structural reason every major AI lab failed to build this.</p>
        <span class="post-read">Read Essay →</span>
      </div>
    </a>

    <a href="/Portfolio/blog/pentagon" class="post-card">
      <div class="post-card-inner">
        <span class="post-date">Mar 16, 2026</span>
        <h3 class="post-title">The Pentagon Went to War with Anthropic. What's Really at Stake?</h3>
        <p class="post-desc">A $200M contract, a supply chain risk designation, and the question no one wants to answer.</p>
        <span class="post-read">Read Essay →</span>
      </div>
    </a>

    <a href="/Portfolio/blog/anthropic" class="post-card">
      <div class="post-card-inner">
        <span class="post-date">Mar 16, 2026</span>
        <h3 class="post-title">Anthropic Isn't Building a Chatbot. It's Building Infrastructure.</h3>
        <p class="post-desc">Constitutional AI, 1M context, and the quiet construction of an enterprise moat.</p>
        <span class="post-read">Read Essay →</span>
      </div>
    </a>

    <a href="/Portfolio/blog/ai-agent-architecture" class="post-card">
      <div class="post-card-inner">
        <span class="post-date">Mar 16, 2026</span>
        <h3 class="post-title">The Architecture of an Autonomous AI Agent</h3>
        <p class="post-desc">Planner, Executor, Memory — the three-layer pattern behind every serious agentic system.</p>
        <span class="post-read">Read Essay →</span>
      </div>
    </a>

    <a href="/Portfolio/blog/nvidia" class="post-card">
      <div class="post-card-inner">
        <span class="post-date">Jan 22, 2026</span>
        <h3 class="post-title">NVIDIA Isn't Waiting for the Future. It's Shipping It.</h3>
        <p class="post-desc">Rubin is in production.</p>
        <span class="post-read">Read Essay →</span>
      </div>
    </a>

    <a href="/Portfolio/blog/asml" class="post-card">
      <div class="post-card-inner">
        <span class="post-date">Jan 21, 2026</span>
        <h3 class="post-title">ASML's Moat Isn't Gone. But It's No Longer Untouchable.</h3>
        <p class="post-desc">On lithography dominance, China exposure, and erosion of structural invincibility.</p>
        <span class="post-read">Read Essay →</span>
      </div>
    </a>

  </div>
</div>

<div class="blog-quote">
  <blockquote>Durable advantage is rarely loud.<br>It hides in constraints others cannot replicate.</blockquote>
</div>
`)])])],-1)])]))}});export{M as __pageData,P as default};
