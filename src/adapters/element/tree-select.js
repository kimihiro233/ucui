import { defineComponent, h } from 'vue'
import { ElTreeSelect } from 'element-plus'

export default defineComponent({
  name: 'UcTreeSelect',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Array], default: undefined },
    options: { type: Array, default: () => [] },
    clearable: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElTreeSelect,
        {
          // element 用 data，value 字段默认 value（nodeKey/valueKey 缺省时）
          data: props.options,
          modelValue: props.modelValue,
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
