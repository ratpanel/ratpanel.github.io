import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Theme from 'vitepress/theme'
import '@shikijs/vitepress-twoslash/style.css'
import 'virtual:group-icons.css'
import "vitepress-markdown-timeline/dist/theme/index.css";
import type {EnhanceAppContext} from 'vitepress'
import './styles.css'

export default {
  extends: Theme,
  enhanceApp({app}: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
  }
}