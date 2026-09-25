import { defineComponent, h, ref, watch } from 'vue'
import { ElTree } from 'element-plus'

// 统一 data 结构：[{ key, label, children?, disabled? }]；element 用 nodeKey + props 字段映射直传
export default defineComponent({
  name: 'UcTree',
  inheritAttrs: false,
  props: {
    data: { type: Array, default: () => [] },
    showCheckbox: Boolean,
    defaultExpandAll: Boolean,
    // 受控勾选 key 数组（v-model:checkedKeys）；不传则为非受控
    checkedKeys: { type: Array, default: undefined },
  },
  emits: ['update:checkedKeys', 'check', 'node-click'],
  setup(props, { emit, slots, attrs }) {
    const treeRef = ref()
    // element 无受控 checkedKeys prop，外部变更时通过实例方法同步
    watch(
      () => props.checkedKeys,
      (keys) => {
        if (keys) treeRef.value?.setCheckedKeys(keys)
      },
    )
    return () =>
      h(
        ElTree,
        {
          ref: treeRef,
          data: props.data,
          nodeKey: 'key',
          props: { label: 'label', children: 'children', disabled: 'disabled' },
          showCheckbox: props.showCheckbox,
          defaultExpandAll: props.defaultExpandAll,
          defaultCheckedKeys: props.checkedKeys,
          ...attrs,
          onCheck: () => {
            const keys = treeRef.value?.getCheckedKeys() ?? []
            emit('update:checkedKeys', keys)
            emit('check', keys)
          },
          'onNode-click': (data) => emit('node-click', data.key, data),
        },
        slots,
      )
  },
})
