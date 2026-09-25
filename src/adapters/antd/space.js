import { defineComponent, h } from 'vue'
import { Space } from 'ant-design-vue'

// UcSpace：间距
// 统一 API：
//   direction(horizontal|vertical，默认 horizontal) /
//   size(large|default|small|number|[h,v]，默认 default) /
//   align(start|center|end|baseline...，默认 center) / wrap(boolean) / fill(boolean，element 独有)
//   默认插槽；#separator 分隔内容（antd 映射 split 插槽）
// antd 档位为 small/middle/large，统一层 default→middle；fill 无能力不透传
const SIZE_MAP = { default: 'middle' }

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
    const normalizeSize = (size) => {
      if (Array.isArray(size)) {
        return size.map((item) => (typeof item === 'string' ? SIZE_MAP[item] || item : item))
      }
      if (typeof size === 'string') return SIZE_MAP[size] || size
      return size
    }

    return () =>
      h(
        Space,
        {
          direction: props.direction,
          size: normalizeSize(props.size),
          align: props.align,
          wrap: props.wrap,
          ...attrs,
        },
        {
          default: slots.default,
          ...(slots.separator ? { split: slots.separator } : {}),
        },
      )
  },
})
