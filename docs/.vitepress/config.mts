import { defineConfig } from 'vitepress'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  title: 'UcUI',
  description: '一套代码，双端渲染的 Vue 3 组件库：element-plus / ant-design-vue 统一 API，运行时可切换',
  lang: 'zh-CN',
  themeConfig: {
    outline: 'deep',
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新于' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: { noResultsText: '未找到结果', resetButtonTitle: '清除查询', footer: { selectText: '选择', navigateText: '切换' } },
        },
      },
    },
    nav: [
      { text: '指南', link: '/guide/quick-start', activeMatch: '/guide/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '双端切换', link: '/guide/dual-lib' },
            { text: '服务式 API', link: '/guide/services' },
            { text: 'TypeScript', link: '/guide/typescript' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [{ text: '总览与示例', link: '/components/' }],
        },
      ],
    },
  },
})
