import { defineComponent, h } from 'vue'
import { ElMain } from 'element-plus'

// UcLayoutContent：内容区（element ElMain 无 props）
export default defineComponent({
  name: 'UcLayoutContent',
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    return () => h(ElMain, { ...attrs }, slots)
  },
})
