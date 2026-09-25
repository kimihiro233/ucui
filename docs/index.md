---
layout: home

hero:
  name: UcUI
  text: 一套代码，双端渲染的 Vue 3 组件库
  tagline: element-plus / ant-design-vue 统一 API · 运行时可切换 · 全量 TypeScript 类型 · 1400+ 双端契约测试
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick-start
    - theme: alt
      text: 组件总览
      link: /components/
    - theme: alt
      text: 双端切换
      link: /guide/dual-lib

features:
  - icon: 🔀
    title: 双端统一
    details: 86 个 Uc 组件统一 API，同一份业务代码驱动 element-plus 或 ant-design-vue 渲染，逐组件契约测试对齐行为。
  - icon: ⚡
    title: 运行时切换
    details: applyLib 一行切库，配合子树 :key 即时换肤；侧栏 Segmented 一键切双端，playground 实测可用。
  - icon: 🛡️
    title: TypeScript 就绪
    details: 全量 d.ts——props / emits / expose 实例方法 / $message 全局属性，模板自动补全，无需任何插件。
  - icon: 📦
    title: 可发布包
    details: ESM + CJS 双格式，ucui / ucui/element / ucui/antd 三入口按需引入，element-plus 与 ant-design-vue 为可选 peer 依赖。
---
