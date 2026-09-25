import { defineComponent, h } from 'vue'
import { Layout } from 'ant-design-vue'

// UcLayoutFooter：底栏
// 统一 API：height(number|string，默认 60，number 自动补 px) + 默认插槽
// antd Layout.Footer 无 height prop，通过 inline style.height 映射
const toCssSize = (v) => (typeof v === 'number' ? `${v}px` : v)

export default defineComponent({
  name: 'UcLayoutFooter',
  inheritAttrs: false,
  props: {
    height: { type: [String, Number], default: 60 },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { style: userStyle, ...restAttrs } = attrs
      return h(
        Layout.Footer,
        {
          style: [{ height: toCssSize(props.height) }, userStyle],
          ...restAttrs,
        },
        slots,
      )
    }
  },
})
