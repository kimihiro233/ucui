import { defineComponent, h } from 'vue'
import { TreeSelect } from 'ant-design-vue'

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
        TreeSelect,
        {
          // antd 用 treeData / value / allowClear
          treeData: props.options,
          value: props.modelValue,
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
