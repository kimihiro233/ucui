import { defineComponent, h } from 'vue'
import { Tree } from 'ant-design-vue'

// antd treeData 展示字段是 title，统一层 label 在此映射
const mapNodes = (list) =>
  (list || []).map((item) => ({
    key: item.key,
    title: item.label,
    disabled: item.disabled,
    children: item.children ? mapNodes(item.children) : undefined,
  }))

export default defineComponent({
  name: 'UcTree',
  inheritAttrs: false,
  props: {
    data: { type: Array, default: () => [] },
    showCheckbox: Boolean,
    defaultExpandAll: Boolean,
    // 受控勾选 key 数组（v-model:checkedKeys）；不传则为非受控（antd checkedKeys 传了即受控）
    checkedKeys: { type: Array, default: undefined },
  },
  emits: ['update:checkedKeys', 'check', 'node-click'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Tree,
        {
          treeData: mapNodes(props.data),
          checkable: props.showCheckbox,
          defaultExpandAll: props.defaultExpandAll,
          ...(props.checkedKeys !== undefined ? { checkedKeys: props.checkedKeys } : {}),
          ...attrs,
          'onUpdate:checkedKeys': (keys) => emit('update:checkedKeys', keys),
          onCheck: (keys) => emit('check', keys),
          onSelect: (keys, info) => emit('node-click', keys[0], info?.node?.dataRef),
        },
        slots,
      )
  },
})
