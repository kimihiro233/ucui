import { defineComponent, h } from 'vue'
import { Transfer } from 'ant-design-vue'

export default defineComponent({
  name: 'UcTransfer',
  inheritAttrs: false,
  props: {
    // 目标侧（右侧）key 数组，v-model 绑定
    modelValue: { type: Array, default: () => [] },
    // 数据源 [{ key, label, disabled? }]
    data: { type: Array, default: () => [] },
    titles: { type: Array, default: () => [] },
    filterable: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(Transfer, {
        targetKeys: props.modelValue,
        // antd 数据源字段是 title，统一层用 label，这里做映射
        dataSource: props.data.map((item) => ({
          key: item.key,
          title: item.label,
          disabled: item.disabled,
        })),
        titles: props.titles,
        showSearch: props.filterable,
        // antd-vue 4.x Transfer 的 defaultRender 返回 null，必须显式传 render 才渲染文本
        render: (item) => item.title,
        ...attrs,
        'onUpdate:targetKeys': (v) => emit('update:modelValue', v),
        onChange: (targetKeys, direction, moveKeys) => emit('change', targetKeys, direction, moveKeys),
      }, slots)
  },
})
