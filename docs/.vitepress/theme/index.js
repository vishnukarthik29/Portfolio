import DefaultTheme from 'vitepress/theme'
import BlogIndex from './BlogIndex.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogIndex', BlogIndex)
  },
}
