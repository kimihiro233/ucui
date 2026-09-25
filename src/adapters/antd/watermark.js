import { defineComponent, h } from 'vue'
import { Watermark } from 'ant-design-vue'

// UcWatermark 统一层：content/image/width/height/rotate/zIndex/gap/offset/font
// antd 侧 prop 名与 element-plus 完全一致，直映
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
        Watermark,
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
