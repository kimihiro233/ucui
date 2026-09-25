import { defineComponent, h } from 'vue'
import { ElAvatar } from 'element-plus'

export default defineComponent({
  name: 'UcAvatar',
  inheritAttrs: false,
  props: {
    // 支持语义档位或 px 数字
    size: { type: [Number, String], default: 'default' },
    shape: {
      type: String,
      default: 'circle',
      validator: (v) => ['circle', 'square'].includes(v),
    },
    src: String,
    alt: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElAvatar,
        {
          size: props.size,
          shape: props.shape,
          src: props.src,
          alt: props.alt,
          ...attrs,
        },
        slots,
      )
  },
})
