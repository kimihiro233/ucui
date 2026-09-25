import { defineComponent, h } from 'vue'
import { Typography } from 'ant-design-vue'

// UcLink：文字链接
// 统一 API：type(default|primary|success|warning|danger)/href/target/disabled/
//           underline(always|hover|never，默认 hover) + @click(event) + 默认插槽
// antd Typography.Link 是函数式组件（displayName=ATypographyLink）：
//   type 只支持 secondary|success|warning|danger，default/primary 不传（保持链接蓝）
//   underline 只有布尔：always→true，never→false，hover→不传（默认悬浮下划线）
const TYPE_MAP = {
  default: undefined,
  primary: undefined,
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

export default defineComponent({
  name: 'UcLink',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (v) =>
        ['default', 'primary', 'success', 'warning', 'danger'].includes(v),
    },
    href: { type: String, default: '' },
    target: { type: String, default: '_self' },
    disabled: Boolean,
    underline: {
      type: String,
      default: 'hover',
      validator: (v) => ['always', 'hover', 'never'].includes(v),
    },
  },
  emits: ['click'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Typography.Link,
        {
          ...(TYPE_MAP[props.type] ? { type: TYPE_MAP[props.type] } : {}),
          href: props.href,
          target: props.target,
          disabled: props.disabled,
          ...(props.underline === 'always'
            ? { underline: true }
            : props.underline === 'never'
              ? { underline: false }
              : {}),
          ...attrs,
          onClick: (event) => emit('click', event),
        },
        { default: slots.default },
      )
  },
})
