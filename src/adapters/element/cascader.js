import { defineComponent, h } from 'vue'
import { ElCascader } from 'element-plus'

export default defineComponent({
  name: 'UcCascader',
  inheritAttrs: false,
  props: {
    // 选中值路径数组 [value, value]
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    clearable: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElCascader,
        {
          modelValue: props.modelValue,
          options: props.options,
          clearable: props.clearable,
          disabled: props.disabled,
          ...attrs,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
          onChange: (v) => emit('change', v),
        },
        slots,
      )
  },
})
