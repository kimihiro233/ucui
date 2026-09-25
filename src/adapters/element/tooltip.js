import { defineComponent, h } from 'vue'
import { ElTooltip } from 'element-plus'

export default defineComponent({
  name: 'UcTooltip',
  inheritAttrs: false,
  props: {
    // 统一用 content 表示浮层文本
    content: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElTooltip,
        {
          content: props.content,
          ...attrs,
        },
        slots,
      )
  },
})
