import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcCollapse 统一契约：所有适配器实现都必须满足这些行为
export function collapseContract(name, UcCollapse) {
  const items = [
    { key: 'a', title: '面板一' },
    { key: 'b', title: '面板二' },
  ]

  const mountCollapse = (props = {}) =>
    mount(UcCollapse, {
      props: { items, ...props },
      slots: {
        a: '<p class="panel-a-content">面板一内容</p>',
        b: '<p class="panel-b-content">面板二内容</p>',
      },
    })

  describe(`UcCollapse 契约 [${name}]`, () => {
    it('渲染折叠面板容器', () => {
      const wrapper = mountCollapse()
      expect(wrapper.find('.el-collapse, .ant-collapse').exists()).toBe(true)
    })

    it('渲染所有面板标题', () => {
      const wrapper = mountCollapse()
      expect(wrapper.text()).toContain('面板一')
      expect(wrapper.text()).toContain('面板二')
    })

    it('渲染面板内容（未激活也保留在 DOM 中）', () => {
      const wrapper = mountCollapse()
      expect(wrapper.find('.panel-a-content').exists()).toBe(true)
      expect(wrapper.find('.panel-b-content').exists()).toBe(true)
    })

    it('modelValue 激活的面板带展开状态', () => {
      const wrapper = mountCollapse({ modelValue: ['a'] })
      // element: el-collapse-item is-active；antd: ant-collapse-item-active
      expect(
        wrapper.find('.el-collapse-item.is-active, .ant-collapse-item-active').exists(),
      ).toBe(true)
    })
  })
}
