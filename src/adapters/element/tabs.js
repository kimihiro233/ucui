import { defineComponent, h } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

// element 的 Tabs 用 ElTabPane 子组件定义面板，这里统一为 items 数组
// 面板内容通过 UcTabs 的具名插槽（插槽名 = item.key）提供
export default defineComponent({
  name: 'UcTabs',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    items: {
      type: Array,
      default: () => [],
      validator: (v) => v.every((t) => t && (typeof t.key === 'string' || typeof t.key === 'number') && t.label),
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElTabs,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          ...attrs,
          onTabChange: (value) => emit('change', value),
        },
        () =>
          props.items.map((item) =>
            h(
              ElTabPane,
              {
                key: item.key,
                name: item.key,
                label: item.label,
                disabled: item.disabled,
              },
              slots[item.key] ? { default: slots[item.key] } : undefined,
            ),
          ),
      )
  },
})
