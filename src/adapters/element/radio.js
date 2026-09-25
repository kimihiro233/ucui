import { defineComponent, h } from 'vue'
import { ElRadio } from 'element-plus'

// 统一层把单个 Radio 建模为布尔选中态；element 的 ElRadio 是"值相等即选中"，
// 通过 value=true 把布尔 modelValue 桥接成值比较
export default defineComponent({
  name: 'UcRadio',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElRadio,
        {
          modelValue: props.modelValue,
          value: true,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value === true),
          disabled: props.disabled,
          ...attrs,
          onChange: (value) => emit('change', value === true),
        },
        slots,
      )
  },
})
