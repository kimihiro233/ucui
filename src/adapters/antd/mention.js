import { defineComponent, h } from 'vue'
import { Mentions } from 'ant-design-vue'

// 统一 options 结构：[{ value, label?, disabled? }]，antd 原生一致
export default defineComponent({
  name: 'UcMentions',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    prefix: { type: [String, Array], default: '@' },
    split: { type: String, default: ' ' },
    placeholder: String,
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ['update:modelValue', 'change', 'select', 'focus', 'blur'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Mentions,
        {
          value: props.modelValue,
          options: props.options,
          prefix: props.prefix,
          split: props.split,
          placeholder: props.placeholder,
          disabled: props.disabled,
          loading: props.loading,
          ...attrs,
          'onUpdate:value': (v) => emit('update:modelValue', v),
          onChange: (v) => emit('change', v),
          onSelect: (option) => emit('select', option),
          onFocus: (e) => emit('focus', e),
          onBlur: (e) => emit('blur', e),
        },
        slots,
      )
  },
})
