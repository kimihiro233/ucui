import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcBreadcrumb 统一契约：所有适配器实现都必须满足这些行为
export function breadcrumbContract(name, UcBreadcrumb) {
  const items = [
    { label: '首页', to: '/' },
    { label: '组件库', to: '/components' },
    { label: '面包屑' },
  ]

  describe(`UcBreadcrumb 契约 [${name}]`, () => {
    it('渲染面包屑容器', () => {
      const wrapper = mount(UcBreadcrumb, { props: { items } })
      expect(wrapper.find('.el-breadcrumb, .ant-breadcrumb').exists()).toBe(true)
    })

    it('渲染所有层级文本', () => {
      const wrapper = mount(UcBreadcrumb, { props: { items } })
      expect(wrapper.text()).toContain('首页')
      expect(wrapper.text()).toContain('组件库')
      expect(wrapper.text()).toContain('面包屑')
    })

    it('层级数量与 items 一致', () => {
      const wrapper = mount(UcBreadcrumb, { props: { items } })
      expect(wrapper.findAll('.el-breadcrumb__item, .ant-breadcrumb-link').length).toBe(3)
    })

    it('自定义 separator', () => {
      const wrapper = mount(UcBreadcrumb, {
        props: { items, separator: '>' },
      })
      expect(wrapper.html()).toContain('>')
    })
  })
}
