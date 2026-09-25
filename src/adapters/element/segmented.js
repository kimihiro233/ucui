import { defineComponent, h } from 'vue'
import { ElSegmented } from 'element-plus'

// UcSegmented：分段控制器
// 统一 API：v-model + options=[{label,value,disabled?}] + disabled/block/size + @change
// element 的 ElSegmented 字段名（label/value/disabled）与统一层一致，直接透传
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
        ElSegmented,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          options: props.options,
          disabled: props.disabled,
          block: props.block,
          size: props.size,
          ...attrs,
          onChange: (value) => emit('change', value),
        },
        slots,
      )
  },
})
