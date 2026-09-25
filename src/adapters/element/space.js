import { defineComponent, h } from 'vue'
import { ElSpace } from 'element-plus'

// UcSpace：间距
// 统一 API：
//   direction(horizontal|vertical，默认 horizontal) /
//   size(large|default|small|number|[h,v]，默认 default) /
//   align(start|center|end|baseline...，默认 center) / wrap(boolean) / fill(boolean，element 独有)
//   默认插槽；#separator 分隔内容（element 映射 spacer prop）
export default defineComponent({
  name: 'UcSpace',
  inheritAttrs: false,
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    size: {
      type: [String, Number, Array],
      default: 'default',
    },
    align: { type: String, default: 'center' },
    wrap: Boolean,
    fill: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElSpace,
        {
          direction: props.direction,
          size: props.size,
          alignment: props.align,
          wrap: props.wrap,
          fill: props.fill,
          // element spacer 只接受单个 VNodeChild（数组会被当文本渲染），取首个 vnode
          ...(slots.separator ? { spacer: slots.separator()[0] } : {}),
          ...attrs,
        },
        { default: slots.default },
      )
  },
})
