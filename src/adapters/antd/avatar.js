import { defineComponent, h } from 'vue'
import { Avatar } from 'ant-design-vue'

export default defineComponent({
  name: 'UcAvatar',
  inheritAttrs: false,
  props: {
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
        Avatar,
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
