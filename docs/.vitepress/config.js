import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VISHNUKARTHIK',
  description: 'Portfolio Blog',
  base: '/Portfolio/blog/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Portfolio', link: '/Portfolio/' },
      // { text: 'Blog', link: '/blog/' },
    ],

    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: "NVIDIA Isn't Waiting for the Future. It's Shipping It.", link: '/nvidia' },
          { text: "ASML's Moat Isn't Gone. But It's No Longer Untouchable.", link: '/asml' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/vishnu-karthik-035260357' },
      { icon: 'github', link: 'https://github.com/vishnukarthik29' },
    ],
  },
})
