import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SITE_URL = 'https://vishnukarthik.me'
const BLOG_BASE = '/blog'
const AUTHOR = 'Vishnukarthik S'

// Auto-generate sidebar from markdown files in docs/
function getSidebarItems() {
  const docsDir = path.resolve(__dirname, '..')
  const files = fs.readdirSync(docsDir)

  return files
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const filePath = path.join(docsDir, f)
      const content = fs.readFileSync(filePath, 'utf-8')
      const fmTitle = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)
      const h1Title = content.match(/^#\s+(.+)$/m)
      const text = fmTitle ? fmTitle[1] : h1Title ? h1Title[1] : f.replace('.md', '')
      const dateMatch = content.match(/^date:\s*(.+)$/m)
      const date = dateMatch ? new Date(dateMatch[1]) : new Date(0)
      return { text, link: '/' + f.replace('.md', ''), date }
    })
    .sort((a, b) => b.date - a.date)
    .map(({ text, link }) => ({ text, link }))
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*["']?(.*?)["']?\s*$/)
    if (kv) fm[kv[1]] = kv[2]
  }
  return fm
}

function extractExcerpt(content, maxLen = 200) {
  const withoutFm = content.replace(/^---[\s\S]*?---\n/, '')
  const firstPara = withoutFm
    .split(/\n\n/)
    .find((p) => p.trim() && !p.startsWith('#') && !p.startsWith('---'))
  if (!firstPara) return ''
  return (
    firstPara
      .replace(/[#*`>\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLen) + (firstPara.length > maxLen ? '…' : '')
  )
}

function generateRSS(posts) {
  const items = posts
    .map((p) => {
      const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString()
      const link = `${SITE_URL}${BLOG_BASE}/${p.slug}`
      const desc = (p.description || p.excerpt)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      return `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${desc}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>contact@vishnukarthik.me (${AUTHOR})</author>
    </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR} — Blog</title>
    <link>${SITE_URL}${BLOG_BASE}/</link>
    <description>Sharp analysis on AI, semiconductors, and tech strategy.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}${BLOG_BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`
}

function getPosts() {
  const docsDir = path.resolve(__dirname, '..')
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md') && f !== 'index.md')
  return files
    .map((f) => {
      const content = fs.readFileSync(path.join(docsDir, f), 'utf-8')
      const fm = parseFrontmatter(content)
      return {
        slug: f.replace('.md', ''),
        title: fm.title || f.replace('.md', ''),
        date: fm.date || '',
        description: fm.description || '',
        excerpt: extractExcerpt(content),
      }
    })
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function rssPlugin() {
  return {
    name: 'vitepress-rss',
    buildEnd() {
      const posts = getPosts()
      const xml = generateRSS(posts)
      const outDir = path.resolve(__dirname, 'dist')
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'feed.xml'), xml, 'utf-8')
      console.log(`[rss] feed.xml written with ${posts.length} posts`)
    },
  }
}

export default defineConfig({
  title: 'VK',
  description: 'Portfolio Blog',
  base: '/blog/',

  head: [
    ['link', { rel: 'icon', href: '/blog/VKP.png' }],
    [
      'link',
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'VK Blog RSS',
        href: 'https://vishnukarthik.me/blog/feed.xml',
      },
    ],
    ['meta', { property: 'og:site_name', content: 'Vishnukarthik S — Blog' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://vishnukarthik.me/blog/VKP.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://vishnukarthik.me/blog/VKP.png' }],
  ],

  transformPageData(pageData) {
    const fm = pageData.frontmatter
    if (!fm.title) return
    const slug = pageData.relativePath.replace('.md', '')
    const url = `https://vishnukarthik.me/blog/${slug}/`
    const desc = fm.description || 'Sharp analysis on AI, semiconductors, and tech strategy.'
    pageData.frontmatter.head = [
      ...(fm.head || []),
      ['meta', { property: 'og:title', content: fm.title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:image', content: 'https://vishnukarthik.me/blog/VKP.png' }],
      ['meta', { name: 'twitter:title', content: fm.title }],
      ['meta', { name: 'twitter:description', content: desc }],
      ['meta', { name: 'description', content: desc }],
      ...(fm.date
        ? [
            [
              'meta',
              { property: 'article:published_time', content: new Date(fm.date).toISOString() },
            ],
          ]
        : []),
    ]
  },

  vite: {
    plugins: [rssPlugin()],
  },

  themeConfig: {
    nav: [{ text: 'Portfolio', link: 'https://vishnukarthik.me/' }],

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
