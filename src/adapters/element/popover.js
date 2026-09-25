import { defineComponent, h } from 'vue'
import { ElPopover } from 'element-plus'

export default defineComponent({
  name: 'UcPopover',
  inheritAttrs: false,
  props: {
    title: String,
    content: String,
    trigger: {
      type: String,
      default: 'hover',
      validator: (v) => ['hover', 'click', 'focus'].includes(v),
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElPopover,
        {
          title: props.title,
          // content prop 在 ElPopover 中作为默认插槽内容的兜底文本
          content: props.content,
          trigger: props.trigger,
          ...attrs,
        },
        // ElPopover 与 ElTooltip 不同：触发元素必须走 reference 具名插槽，
        // 默认插槽是浮层内容（统一层不暴露内容插槽，content prop 兜底）
        {
          reference: slots.default,
        },
      )
  },
})
