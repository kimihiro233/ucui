import { defineComponent, h } from 'vue'
import { Empty } from 'ant-design-vue'

export default defineComponent({
  name: 'UcEmpty',
  inheritAttrs: false,
  props: {
    description: String,
    image: String,
    imageSize: Number,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Empty,
        {
          description: props.description,
          image: props.image,
          // antd 用 imageStyle 对象，统一层 imageSize 数字映射为宽度
          imageStyle: props.imageSize ? { width: `${props.imageSize}px` } : undefined,
          ...attrs,
        },
        slots,
      )
  },
})
