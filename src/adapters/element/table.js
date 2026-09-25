import { defineComponent, h } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'

// element-plus 的 ElTable 使用插槽列定义，这里统一为 columns 数组
export default defineComponent({
  name: 'UcTable',
  inheritAttrs: false,
  props: {
    data: { type: Array, default: () => [] },
    columns: {
      type: Array,
      default: () => [],
      validator: (v) => v.every((c) => c && typeof c.key === 'string' && typeof c.title === 'string'),
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        ElTable,
        {
          data: props.data,
          ...attrs,
        },
        () =>
          props.columns.map((col) =>
            h(
              ElTableColumn,
              {
                key: col.key,
                prop: col.key,
                label: col.title,
              },
              col.render
                ? {
                    default: ({ row }) => col.render(row),
                  }
                : undefined,
            ),
          ),
      )
  },
})
