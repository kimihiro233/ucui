import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcLayout 统一契约：direction(vertical|horizontal，默认 vertical) + 默认插槽
// element ElContainer 靠直接子组件名自动探测方向（包装组件会使其失效，适配器显式传 direction）；
// antd Layout 通过 hasSider 切换横向布局
export function layoutContract(libName, UcLayout) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElContainer' : 'ALayout'
  const rootSelector = isElement ? '.el-container' : '.ant-layout'

  const mountLayout = (props = {}) =>
    mount(UcLayout, {
      props,
      slots: { default: '<div class="layout-child">内容</div>' },
    })

  describe(`UcLayout 契约 [${libName}]`, () => {
    it('渲染 section 布局容器与默认插槽', () => {
      const wrapper = mountLayout()
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('SECTION')
      expect(wrapper.find('.layout-child').text()).toBe('内容')
    })

    it('默认 vertical：element 带 is-vertical，antd 不带 has-sider', () => {
      const wrapper = mountLayout()
      const root = wrapper.find(rootSelector)
      if (isElement) {
        expect(root.classes()).toContain('is-vertical')
      } else {
        expect(root.classes()).not.toContain('ant-layout-has-sider')
      }
    })

    it("direction='horizontal'：element 无 is-vertical，antd 带 has-sider", () => {
      const wrapper = mountLayout({ direction: 'horizontal' })
      const root = wrapper.find(rootSelector)
      if (isElement) {
        expect(root.classes()).not.toContain('is-vertical')
      } else {
        expect(root.classes()).toContain('ant-layout-has-sider')
      }
    })

    it('direction 映射到底层组件', () => {
      const wrapper = mountLayout({ direction: 'horizontal' })
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        expect(inner.props('direction')).toBe('horizontal')
      } else {
        expect(inner.props('hasSider')).toBe(true)
      }
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountLayout({ class: 'my-layout' })
      expect(wrapper.html()).toContain('my-layout')
    })
  })
}
