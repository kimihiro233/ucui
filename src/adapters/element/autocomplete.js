import { defineComponent, h } from 'vue'
import { ElAutocomplete } from 'element-plus'
import { sizeMap, sizePropDef } from './shared'

// 统一 API：fetchSuggestions(query, callback) 回调返回 [{ value, ... }]，element 原生支持该模式
export default defineComponent({
  name: 'UcAutoComplete',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    fetchSuggestions: { type: Function, required: true },
    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    size: sizePropDef,
  },
  emits: ['update:modelValue', 'input', 'change', 'select'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElAutocomplete,
        {
          modelValue: props.modelValue,
          fetchSuggestions: props.fetchSuggestions,
          placeholder: props.placeholder,
          clearable: props.clearable,
          disabled: props.disabled,
          size: sizeMap[props.size],
          ...attrs,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
          onInput: (v) => emit('input', v),
          onChange: (v) => emit('change', v),
          onSelect: (item) => emit('select', item),
        },
        slots,
      )
  },
})
