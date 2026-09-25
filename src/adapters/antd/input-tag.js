import { defineComponent, h, ref } from 'vue'
import { Select } from 'ant-design-vue'
import { sizeMap, sizePropDef } from './shared'

// element 有原生 InputTag；antd 无对应组件，桥接 ASelect mode="tags"
// 统一层 max 是"最多可输入标签数"（element 能力），antd Select 无对等能力（maxTagCount 语义是折叠展示），声明后丢弃不透传
// 清空时 antd 发 undefined，统一为 []（与 element 兜底归一化一致）
export default defineComponent({
  name: 'UcInputTag',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array, default: () => [] },
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    max: Number,
    size: sizePropDef,
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props, { emit, attrs, expose }) {
    const inner = ref()
    expose({
      focus: () => inner.value?.focus(),
      blur: () => inner.value?.blur(),
    })
    return () =>
      h(Select, {
        ref: inner,
        mode: 'tags',
        value: props.modelValue,
        'onUpdate:value': (v) => emit('update:modelValue', v ?? []),
        placeholder: props.placeholder,
        disabled: props.disabled,
        allowClear: props.clearable,
        size: sizeMap[props.size],
        ...attrs,
        onChange: (v) => emit('change', v ?? []),
        onFocus: (e) => emit('focus', e),
        onBlur: (e) => emit('blur', e),
      })
  },
})
