import DefaultTheme from 'vitepress/theme'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'

// 文档站演示区直接渲染 Uc 组件（element-plus 端）
// SSR 预渲染阶段 element-plus 要求注入 id / z-index provider，否则 hydration 警告
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  },
}
