import { defineComponent, h } from 'vue'
import { ElResult } from 'element-plus'

export default defineComponent({
  name: 'UcResult',
  inheritAttrs: false,
  props: {
    // 统一语义状态；element 侧对应 icon prop，antd 侧对应 status prop
    status: {
      type: String,
      default: 'info',
      validator: (v) => ['success', 'error', 'warning', 'info'].includes(v),
    },
    title: String,
    subTitle: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElResult,
        {
          icon: props.status,
          title: props.title,
          subTitle: props.subTitle,
          ...attrs,
        },
        { extra: slots.extra },
      )
  },
})
