import { defineComponent, h } from 'vue'
import { Button as AButton } from 'ant-design-vue'

// 统一 props -> ant-design-vue props 的映射表
// type 只保留语义色；antd 的 danger 是独立 boolean，不是 type
const typeMap = {
  primary: 'primary',
  default: 'default',
  danger: 'primary',
}

const sizeMap = {
  large: 'large',
  default: 'middle', // antd 的中间档叫 middle
  small: 'small',
}

export default defineComponent({
  name: 'UcButton',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (v) => ['primary', 'default', 'danger'].includes(v),
    },
    // 文字按钮形态（无背景无边框），与 type 正交：<UcButton type="danger" text>
    text: Boolean,
    // 超链接样式按钮，与 type 正交：<UcButton type="primary" link>
    link: Boolean,
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['large', 'default', 'small'].includes(v),
    },
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ['click'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        AButton,
        {
          // antd 里 text/link 是 type 的取值：形态维度覆盖 type，颜色语义由 danger 继续生效
          // link 优先于 text（antd 的 type 单值，二者同时传入时需要取舍）
          type: props.link ? 'link' : props.text ? 'text' : typeMap[props.type],
          danger: props.type === 'danger',
          size: sizeMap[props.size],
          disabled: props.disabled,
          loading: props.loading,
          // 逃生舱：统一 API 未覆盖的原生 props 通过 attrs 透传
          ...attrs,
          onClick: (event) => emit('click', event),
        },
        slots,
      )
  },
})
