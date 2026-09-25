import { defineComponent, h } from 'vue'
import { Radio } from 'ant-design-vue'

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
        Radio,
        {
          // antd 的 Radio 使用 v-model:checked，归一化为标准 modelValue
          checked: props.modelValue,
          'onUpdate:checked': (value) => emit('update:modelValue', value),
          disabled: props.disabled,
          ...attrs,
          // antd 的 change 参数是事件对象，归一化为布尔值
          onChange: (event) => emit('change', event.target.checked),
        },
        slots,
      )
  },
})
