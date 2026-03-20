import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter(page => page.url !== '/')          // exclude index.md
      .map(page => ({
        slug:  page.url.replace(/^\//, '').replace(/\.html$/, ''),
        title: page.frontmatter.title || page.url,
        date:  page.frontmatter.date  || '',
        desc:  page.frontmatter.description || '',
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  },
})
