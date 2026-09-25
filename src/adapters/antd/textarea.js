import { defineComponent, h } from 'vue'
import { Textarea } from 'ant-design-vue'

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
      h(Textarea, {
        // antd 的 Textarea 使用 v-model:value，归一化为标准 modelValue
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        placeholder: props.placeholder,
        rows: props.rows,
        autoSize: props.autoSize,
        maxlength: props.maxlength,
        showCount: props.showCount,
        disabled: props.disabled,
        readonly: props.readonly,
        ...attrs,
        // antd 的 change 参数是事件对象，归一化为值
        onChange: (event) => emit('change', event.target.value),
        onInput: (event) => emit('input', event.target.value),
      })
  },
})
