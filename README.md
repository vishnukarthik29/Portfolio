<h1 align="center">Vishnu Karthik</h1>
<h3 align="center">Full-stack developer · Builder of business software · Writer on AI &amp; tech strategy</h3>

<p align="center">
  <a href="https://vishnukarthik.me"><img src="https://img.shields.io/badge/Portfolio-vishnukarthik.me-111111?style=for-the-badge" /></a>
  <a href="https://vishnukarthik.me/blog/"><img src="https://img.shields.io/badge/Blog-Read-5C73E7?style=for-the-badge&logo=vitepress&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/vishnu-karthik-035260357"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:vishnukarthik2912@gmail.com"><img src="https://img.shields.io/badge/Email-Get_in_touch-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

---

### 👋 Who I Am

I build the software businesses actually run on: ERPs, e-commerce platforms, and SaaS tools for small and mid-sized companies. I work across the full stack, from the data model to the interface, and I care most about the unglamorous part: the rules, workflows, and edge cases that decide whether a system survives contact with real operations.

I'm based in Chennai, India, and work with clients locally and internationally.

---

### 🧭 What I Do

- 🏗️ **Business software:** internal ERPs and operations tools, built end to end
- 🛒 **E-commerce:** custom storefronts and commerce backends
- 🚀 **SaaS & freelance:** web products for SME clients, from first prototype to production
- 🎨 **Front-end craft:** fast, responsive interfaces with real attention to design

---

### 🧠 Skills

**Frontend**

<p align="left">
<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

**Backend**

<p align="left">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=cplusplus&logoColor=white" />
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />
</p>

**Data & ML**

<p align="left">
<img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" />
<img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" />
<img src="https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logo=plotly&logoColor=white" />
<img src="https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white" />
<img src="https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black" />
</p>

**Tools**

<p align="left">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

### 🤝 Work With Me

Open to freelance projects and collaborations: business software, e-commerce, and SaaS builds for small and mid-sized companies.

📩 [vishnukarthik2912@gmail.com](mailto:vishnukarthik2912@gmail.com) · 🌐 [vishnukarthik.me](https://vishnukarthik.me)

---

<details>
<summary><b>⚙️ Under the hood: how this site is built</b></summary>

<br />

This repository is the source for [vishnukarthik.me](https://vishnukarthik.me): a Vue 3 portfolio plus a VitePress blog on one domain.

| Part                                              | Path    | Built with                            |
| ------------------------------------------------- | ------- | ------------------------------------- |
| Portfolio (Home, About, Projects, Contact)        | `src/`  | Vue 3 + Vite + Tailwind CSS           |
| Blog at [`/blog`](https://vishnukarthik.me/blog/) | `docs/` | VitePress, one Markdown file per post |

Highlights: light/dark theme, an animated Three.js metal-beams background, an EmailJS contact form, and an auto-generated blog index, sidebar, RSS feed, and social-preview tags.

**Run locally** (Node 20+):

```bash
npm install
npm run dev           # portfolio
npm run docs:dev      # blog
npm run build         # production build of the portfolio
npm run docs:build    # production build of the blog
```

**Publish a post:** add `docs/my-post.md` with this frontmatter and push to `main`. The index, sidebar, and RSS feed update themselves.

```md
---
title: 'Post title'
description: 'One or two sentences, used for the index, RSS, and social previews.'
date: 2026-10-12
---
```

Posts without a `date` are left out of the RSS feed.

**Deploy:** every push to `main` runs `.github/workflows/deploy.yml`, which builds both apps and publishes them to GitHub Pages on the `vishnukarthik.me` domain.

```text
src/                  Portfolio app (views, components, router)
docs/                 Blog posts + docs/.vitepress (config, theme, RSS)
public/               Static assets (CNAME, icons, resume PDF)
.github/workflows/    CI/CD
```

</details>
