import { defineComponent, h } from 'vue'
import { ElAffix } from 'element-plus'

// UcAffix：固钉
// 统一 API：offset(number，默认 0)/position(top|bottom，默认 top)/target(CSS 选择器字符串) + @change(fixed)
// element 的 offset/position/target 同名直映（target 接受 CSS selector）
export default defineComponent({
  name: 'UcAffix',
  inheritAttrs: false,
  props: {
    offset: { type: Number, default: 0 },
    position: {
      type: String,
      default: 'top',
      validator: (v) => ['top', 'bottom'].includes(v),
    },
    target: { type: String, default: '' },
  },
  emits: ['change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElAffix,
        {
          offset: props.offset,
          position: props.position,
          ...(props.target ? { target: props.target } : {}),
          ...attrs,
          onChange: (fixed) => emit('change', fixed),
        },
        slots,
      )
  },
})
