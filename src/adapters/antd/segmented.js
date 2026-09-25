import { defineComponent, h } from 'vue'
import { Segmented } from 'ant-design-vue'

// UcSegmented：分段控制器
// 统一 API：v-model + options=[{label,value,disabled?}] + disabled/block/size + @change
// antd 用 value 绑定（内部转换 modelValue），size 中间档是 middle
const sizeMap = {
  large: 'large',
  default: 'middle',
  small: 'small',
}

export default defineComponent({
  name: 'UcSegmented',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    options: {
      type: Array,
      default: () => [],
      validator: (v) => v.every((o) => o && 'value' in o),
    },
    disabled: Boolean,
    block: Boolean,
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['large', 'default', 'small'].includes(v),
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Segmented,
        {
          value: props.modelValue,
          'onUpdate:value': (value) => emit('update:modelValue', value),
          options: props.options,
          disabled: props.disabled,
          block: props.block,
          size: sizeMap[props.size],
          ...attrs,
          onChange: (value) => emit('change', value),
        },
        slots,
      )
  },
})
