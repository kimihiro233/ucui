import { defineComponent, h } from 'vue'
import { ElMention } from 'element-plus'

// 统一 options 结构：[{ value, label?, disabled? }]，element 默认字段正好一致
export default defineComponent({
  name: 'UcMentions',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    // 触发字符，长度必须为 1（两端一致）
    prefix: { type: [String, Array], default: '@' },
    // 提及后的分隔符
    split: { type: String, default: ' ' },
    placeholder: String,
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ['update:modelValue', 'change', 'select', 'focus', 'blur'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElMention,
        {
          modelValue: props.modelValue,
          options: props.options,
          prefix: props.prefix,
          split: props.split,
          placeholder: props.placeholder,
          disabled: props.disabled,
          loading: props.loading,
          ...attrs,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
          // element 无 change 事件，用 input 归一化
          onInput: (v) => emit('change', v),
          onSelect: (option) => emit('select', option),
          onFocus: (e) => emit('focus', e),
          onBlur: (e) => emit('blur', e),
        },
        slots,
      )
  },
})
