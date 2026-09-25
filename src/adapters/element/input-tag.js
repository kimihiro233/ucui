import { defineComponent, h, ref } from 'vue'
import { ElInputTag } from 'element-plus'
import { sizePropDef } from './shared'

// element-plus 原生 ElInputTag（2.9+）直映；antd 侧无对应组件，桥接 ASelect mode="tags"（见 antd/input-tag.js）
// 统一层归一化：element 清空时 update:modelValue/change 发 undefined，统一为 []
export default defineComponent({
  name: 'UcInputTag',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array, default: () => [] },
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    max: Number, // 最多可输入的标签数（element 单边能力：达到上限后不可再输入；antd 无对等能力不透传）
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
      h(ElInputTag, {
        ref: inner,
        modelValue: props.modelValue,
        'onUpdate:modelValue': (v) => emit('update:modelValue', v ?? []),
        max: props.max,
        placeholder: props.placeholder,
        disabled: props.disabled,
        clearable: props.clearable,
        size: props.size,
        ...attrs,
        onChange: (v) => emit('change', v ?? []),
        onFocus: (e) => emit('focus', e),
        onBlur: (e) => emit('blur', e),
      })
  },
})
