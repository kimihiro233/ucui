import { defineComponent, h, ref } from 'vue'
import { AutoComplete } from 'ant-design-vue'
import { sizeMap, sizePropDef } from './shared'

// 统一 API：fetchSuggestions(query, callback)；antd 无回调模式，桥接为 search/focus 时拉取写入内部 options
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
    const options = ref([])
    const load = (query) => {
      props.fetchSuggestions(query == null ? '' : String(query), (list) => {
        // antd options 需要 label 字段用于展示，缺省时回退为 value
        options.value = (list || []).map((item) =>
          typeof item === 'object' ? { ...item, label: item.label ?? item.value } : { value: item, label: item },
        )
      })
    }
    return () =>
      h(
        AutoComplete,
        {
          value: props.modelValue,
          options: options.value,
          placeholder: props.placeholder,
          allowClear: props.clearable,
          disabled: props.disabled,
          size: sizeMap[props.size],
          // 过滤逻辑由 fetchSuggestions 负责，关闭 antd 内置过滤
          filterOption: false,
          ...attrs,
          'onUpdate:value': (v) => emit('update:modelValue', v),
          onSearch: (query) => load(query),
          onFocus: () => load(props.modelValue),
          onChange: (v) => {
            emit('input', v)
            emit('change', v)
          },
          onSelect: (v, option) => emit('select', option),
        },
        slots,
      )
  },
})
