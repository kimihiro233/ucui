import { defineComponent, h } from 'vue'
import { Divider } from 'ant-design-vue'

export default defineComponent({
  name: 'UcDivider',
  inheritAttrs: false,
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    orientation: {
      type: String,
      default: 'center',
      validator: (v) => ['left', 'center', 'right'].includes(v),
    },
    dashed: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Divider,
        {
          // antd 用 type 表示方向，orientation 表示文本位置
          type: props.direction,
          orientation: props.orientation,
          dashed: props.dashed,
          ...attrs,
        },
        slots,
      )
  },
})
