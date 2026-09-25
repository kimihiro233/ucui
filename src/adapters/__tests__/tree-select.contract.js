import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcTreeSelect 统一契约：所有适配器实现都必须满足这些行为
// 下拉树面板依赖 popper，契约只测选择框渲染与数据/值映射
export function treeSelectContract(name, UcTreeSelect) {
  const options = [
    {
      value: 'parent',
      label: '父节点',
      children: [{ value: 'child', label: '子节点' }],
    },
  ]

  describe(`UcTreeSelect 契约 [${name}]`, () => {
    it('渲染树形选择器', () => {
      const wrapper = mount(UcTreeSelect, { props: { options } })
      // element TreeSelect 复用 select 外壳；antd 是 ant-select
      expect(wrapper.find('.el-select, .ant-select').exists()).toBe(true)
    })

    it('options 映射到底层数据源', () => {
      const wrapper = mount(UcTreeSelect, { props: { options } })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElTreeSelect' })
          : wrapper.findComponent({ name: 'TreeSelect' })
      // element 用 data；antd 用 treeData
      const dataKey = name === 'element-plus' ? 'data' : 'treeData'
      // 底层会加工数据，用 toEqual 比较内容
      expect(comp.props(dataKey)).toEqual(options)
    })

    it('modelValue 映射到底层值', () => {
      const wrapper = mount(UcTreeSelect, {
        props: { options, modelValue: 'child' },
      })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElTreeSelect' })
          : wrapper.findComponent({ name: 'TreeSelect' })
      const valueKey = name === 'element-plus' ? 'modelValue' : 'value'
      expect(comp.props(valueKey)).toBe('child')
    })

    it('disabled 时禁用', () => {
      const wrapper = mount(UcTreeSelect, {
        props: { options, disabled: true },
      })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElTreeSelect' })
          : wrapper.findComponent({ name: 'TreeSelect' })
      expect(comp.props('disabled')).toBe(true)
    })
  })
}
