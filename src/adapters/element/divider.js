import { defineComponent, h } from 'vue'
import { ElDivider } from 'element-plus'

export default defineComponent({
  name: 'UcDivider',
  inheritAttrs: false,
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    // 文本位置（仅 horizontal 且有文本时有效）
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
        ElDivider,
        {
          direction: props.direction,
          contentPosition: props.orientation,
          // element 用 borderStyle 表示虚线
          borderStyle: props.dashed ? 'dashed' : 'solid',
          ...attrs,
        },
        slots,
      )
  },
})
