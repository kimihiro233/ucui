import { defineComponent, h } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { sizeMap, sizePropDef } from './shared'

// 统一 options 结构：[{ label, value, disabled? }]
export default defineComponent({
  name: 'UcSelect',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: undefined },
    options: { type: Array, default: () => [] },
    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    size: sizePropDef,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(
        ElSelect,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          placeholder: props.placeholder,
          clearable: props.clearable,
          disabled: props.disabled,
          size: sizeMap[props.size],
          ...attrs,
          onChange: (value) => emit('change', value),
        },
        {
          default: () =>
            props.options.map((option) =>
              h(ElOption, {
                key: option.value,
                label: option.label,
                value: option.value,
                disabled: option.disabled,
              }),
            ),
        },
      )
  },
})
