import { defineComponent, h } from 'vue'
import { Cascader } from 'ant-design-vue'

export default defineComponent({
  name: 'UcCascader',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    clearable: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Cascader,
        {
          // antd 用 value，clearable 叫 allowClear
          value: props.modelValue,
          options: props.options,
          allowClear: props.clearable,
          disabled: props.disabled,
          ...attrs,
          'onUpdate:value': (v) => emit('update:modelValue', v),
          onChange: (v) => emit('change', v),
        },
        slots,
      )
  },
})
