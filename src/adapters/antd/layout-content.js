import { defineComponent, h } from 'vue'
import { Layout } from 'ant-design-vue'

// UcLayoutContent：内容区（antd Layout.Content 无 props）
export default defineComponent({
  name: 'UcLayoutContent',
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    return () => h(Layout.Content, { ...attrs }, slots)
  },
})
