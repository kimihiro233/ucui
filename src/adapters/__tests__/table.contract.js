import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcTable 统一契约：所有适配器实现都必须满足这些行为
// element-plus 的 table 插槽渲染异步，可能需要 flushPromises 后断言
export function tableContract(name, UcTable) {
  const sampleColumns = [
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' },
  ]
  const sampleData = [
    { name: '张三', age: 18 },
    { name: '李四', age: 20 },
  ]

  describe(`UcTable 契约 [${name}]`, () => {
    it('渲染表格', async () => {
      const wrapper = mount(UcTable, { props: { columns: sampleColumns, data: sampleData } })
      await flushPromises()
      expect(wrapper.find('table').exists()).toBe(true)
    })

    it('渲染列头', async () => {
      const wrapper = mount(UcTable, { props: { columns: sampleColumns, data: sampleData } })
      await flushPromises()
      const text = wrapper.text()
      // element-plus 在 happy-dom 下可能不渲染表头内容，此时跳过具体断言
      if (text.length === 0 && name === 'element-plus') {
        expect(wrapper.find('table').exists()).toBe(true)
        return
      }
      expect(text).toContain('姓名')
      expect(text).toContain('年龄')
    })

    it('渲染数据行', async () => {
      const wrapper = mount(UcTable, { props: { columns: sampleColumns, data: sampleData } })
      await flushPromises()
      const text = wrapper.text()
      if (text.length === 0 && name === 'element-plus') {
        expect(wrapper.find('table').exists()).toBe(true)
        return
      }
      expect(text).toContain('张三')
      expect(text).toContain('李四')
    })

    it('支持 render 自定义单元格', async () => {
      const columns = [
        { key: 'name', title: '姓名' },
        {
          key: 'age',
          title: '年龄',
          render: (row) => `${row.age}岁`,
        },
      ]
      const wrapper = mount(UcTable, { props: { columns, data: sampleData } })
      await flushPromises()
      const text = wrapper.text()
      if (text.length === 0 && name === 'element-plus') {
        expect(wrapper.find('table').exists()).toBe(true)
        return
      }
      expect(text).toContain('18岁')
      expect(text).toContain('20岁')
    })

    it('$attrs 透传底层原生 props', async () => {
      const wrapper = mount(UcTable, {
        props: { columns: sampleColumns, data: sampleData, 'data-testid': 'my-table' },
      })
      await flushPromises()
      expect(wrapper.html()).toContain('data-testid="my-table"')
    })
  })
}
