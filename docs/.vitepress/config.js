import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Auto-generate sidebar from markdown files in docs/
function getSidebarItems() {
  const docsDir = path.resolve(__dirname, '..')
  const files = fs.readdirSync(docsDir)

  return files
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => {
      const filePath = path.join(docsDir, f)
      const content = fs.readFileSync(filePath, 'utf-8')

      // Extract title from frontmatter or first h1
      const fmTitle = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)
      const h1Title = content.match(/^#\s+(.+)$/m)
      const text = fmTitle ? fmTitle[1] : h1Title ? h1Title[1] : f.replace('.md', '')

      // Extract date from frontmatter for sorting
      const dateMatch = content.match(/^date:\s*(.+)$/m)
      const date = dateMatch ? new Date(dateMatch[1]) : new Date(0)

      return { text, link: '/' + f.replace('.md', ''), date }
    })
    .sort((a, b) => b.date - a.date) // newest first
    .map(({ text, link }) => ({ text, link }))
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VK',
  description: 'Portfolio Blog',
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/blog/VKP.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Portfolio', link: 'https://vishnukarthik.me/' },
      // { text: 'Blog', link: '/blog/' },
    ],

    sidebar: [
      {
        text: 'Blog',
        items: getSidebarItems(),
      },
    ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/vishnu-karthik-035260357' },
      { icon: 'github', link: 'https://github.com/vishnukarthik29' },
    ],
  },
})
