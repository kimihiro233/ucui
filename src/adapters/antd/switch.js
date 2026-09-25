import { defineComponent, h } from 'vue'
import { Switch } from 'ant-design-vue'

export default defineComponent({
  name: 'UcSwitch',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(Switch, {
        // antd 的 Switch 使用 v-model:checked，归一化为标准 modelValue
        checked: props.modelValue,
        'onUpdate:checked': (value) => emit('update:modelValue', value),
        disabled: props.disabled,
        loading: props.loading,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
