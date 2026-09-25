import { defineComponent, h } from 'vue'
import { Tooltip } from 'ant-design-vue'

export default defineComponent({
  name: 'UcTooltip',
  inheritAttrs: false,
  props: {
    content: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Tooltip,
        {
          // antd 的浮层文本 prop 叫 title，归一化为 content
          title: props.content,
          ...attrs,
        },
        slots,
      )
  },
})
