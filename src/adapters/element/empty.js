import { defineComponent, h } from 'vue'
import { ElEmpty } from 'element-plus'

export default defineComponent({
  name: 'UcEmpty',
  inheritAttrs: false,
  props: {
    description: String,
    image: String,
    // 图片宽度（px 数字）
    imageSize: Number,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElEmpty,
        {
          description: props.description,
          image: props.image,
          imageSize: props.imageSize,
          ...attrs,
        },
        slots,
      )
  },
})
