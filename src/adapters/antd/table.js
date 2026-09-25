import { defineComponent, h } from 'vue'
import { Table } from 'ant-design-vue'

// antd 的 Table 原生支持 columns 数组，直接透传
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
    // antd 的 columns 里 customRender 接收 { text, record, index }，这里把 render(row) 映射过去
    const antdColumns = props.columns.map((col) => {
      const { render, ...rest } = col
      return {
        dataIndex: col.key,
        ...rest,
        ...(render ? { customRender: ({ record }) => render(record) } : {}),
      }
    })

    return () =>
      h(Table, {
        dataSource: props.data,
        columns: antdColumns,
        ...attrs,
      })
  },
})
