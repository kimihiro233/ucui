import { defineComponent, h } from 'vue'
import { ElWatermark } from 'element-plus'

// UcWatermark 统一层：content/image/width/height/rotate/zIndex/gap/offset/font
// 双端 API 同名直映，默认插槽为被水印包裹的内容
export default defineComponent({
  name: 'UcWatermark',
  inheritAttrs: false,
  props: {
    content: { type: [String, Array], default: 'UniUI' },
    image: { type: String, default: '' },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    rotate: { type: Number, default: -22 },
    zIndex: { type: Number, default: 9 },
    gap: { type: Array, default: () => [100, 100] },
    offset: { type: Array, default: undefined },
    font: { type: Object, default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElWatermark,
        {
          content: props.content,
          image: props.image || undefined,
          width: props.width,
          height: props.height,
          rotate: props.rotate,
          zIndex: props.zIndex,
          gap: props.gap,
          offset: props.offset,
          font: props.font,
          ...attrs,
        },
        slots,
      )
  },
})
