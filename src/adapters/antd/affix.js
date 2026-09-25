import { defineComponent, h } from 'vue'
import { Affix } from 'ant-design-vue'

// UcAffix：固钉
// 统一 API：offset(number，默认 0)/position(top|bottom，默认 top)/target(CSS 选择器字符串) + @change(fixed)
// antd 用 offsetTop/offsetBottom 两个 prop；target 是返回元素的函数，统一层字符串选择器在此转换
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
        Affix,
        {
          [props.position === 'bottom' ? 'offsetBottom' : 'offsetTop']: props.offset,
          ...(props.target
            ? { target: () => document.querySelector(props.target) || window }
            : {}),
          ...attrs,
          onChange: (affixed) => emit('change', affixed),
        },
        slots,
      )
  },
})
