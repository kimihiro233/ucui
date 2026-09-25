import { defineComponent, h } from 'vue'
import { Tabs } from 'ant-design-vue'

// 该版本 ant-design-vue（rc-tabs 11）不支持 items prop，
// 通过默认插槽的 TabPane 子节点解析面板，与 element-plus 的 ElTabPane 模式同构
const { TabPane } = Tabs

// 统一层：items 数组定义标签，面板内容通过具名插槽（插槽名 = item.key）提供
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
        Tabs,
        {
          // antd 用 activeKey 控制激活面板
          activeKey: props.modelValue,
          'onUpdate:activeKey': (value) => emit('update:modelValue', value),
          ...attrs,
          onChange: (value) => emit('change', value),
        },
        () =>
          props.items.map((item) =>
            h(
              TabPane,
              {
                key: item.key,
                // antd TabPane 的标签 prop 叫 tab
                tab: item.label,
                disabled: item.disabled,
              },
              slots[item.key] ? { default: slots[item.key] } : undefined,
            ),
          ),
      )
  },
})
