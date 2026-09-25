import { defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'

// 统一 props -> element-plus props 的映射表
// type 只保留语义色；text 是独立形态维度
// （element-plus 将在其 3.0 版本废弃 type="text"，提前改用 text boolean）
const typeMap = {
  primary: 'primary',
  default: '', // element 的默认按钮没有 type
  danger: 'danger',
}

const sizeMap = {
  large: 'large',
  default: 'default',
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
        ElButton,
        {
          type: typeMap[props.type],
          text: props.text,
          link: props.link,
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
