import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcCascader 统一契约：所有适配器实现都必须满足这些行为
// 下拉面板依赖 popper，契约只测选择框渲染与值/配置映射
export function cascaderContract(name, UcCascader) {
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [{ value: 'hangzhou', label: '杭州' }],
    },
    { value: 'jiangsu', label: '江苏' },
  ]

  describe(`UcCascader 契约 [${name}]`, () => {
    it('渲染级联选择器', () => {
      const wrapper = mount(UcCascader, { props: { options } })
      expect(wrapper.find('.el-cascader, .ant-cascader').exists()).toBe(true)
    })

    it('options 透传到底层', () => {
      const wrapper = mount(UcCascader, { props: { options } })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElCascader' })
          : wrapper.findComponent({ name: 'Cascader' })
      // 底层会加工 options（reactive/normalize），用 toEqual 比较内容
      expect(comp.props('options')).toEqual(options)
    })

    it('modelValue 映射到底层值', () => {
      const wrapper = mount(UcCascader, {
        props: { options, modelValue: ['zhejiang', 'hangzhou'] },
      })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElCascader' })
          : wrapper.findComponent({ name: 'Cascader' })
      const valueKey = name === 'element-plus' ? 'modelValue' : 'value'
      expect(comp.props(valueKey)).toEqual(['zhejiang', 'hangzhou'])
    })

    it('clearable 映射（antd 为 allowClear）', () => {
      const wrapper = mount(UcCascader, {
        props: { options, clearable: true },
      })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElCascader' })
          : wrapper.findComponent({ name: 'Cascader' })
      const clearKey = name === 'element-plus' ? 'clearable' : 'allowClear'
      expect(comp.props(clearKey)).toBe(true)
    })
  })
}
