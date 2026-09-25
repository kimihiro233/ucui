import { defineComponent, h } from 'vue'
import { ElInput } from 'element-plus'

export default defineComponent({
  name: 'UcTextarea',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    placeholder: String,
    rows: { type: Number, default: 2 },
    // 自适应高度：boolean 或 { minRows, maxRows }
    autoSize: { type: [Boolean, Object], default: false },
    maxlength: { type: [String, Number], default: undefined },
    showCount: Boolean,
    disabled: Boolean,
    readonly: Boolean,
  },
  emits: ['update:modelValue', 'change', 'input'],
  setup(props, { emit, attrs }) {
    return () =>
      h(ElInput, {
        type: 'textarea',
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        placeholder: props.placeholder,
        rows: props.rows,
        // element 的属性名是小写 autosize
        autosize: props.autoSize,
        maxlength: props.maxlength,
        showWordLimit: props.showCount, // element 叫 show-word-limit
        disabled: props.disabled,
        readonly: props.readonly,
        ...attrs,
        onChange: (value) => emit('change', value),
        onInput: (value) => emit('input', value),
      })
  },
})
