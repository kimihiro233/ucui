import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcLayoutSider 统一契约：width(number|string，默认 300) + 默认插槽
// element 用 CSS 变量 --el-aside-width；antd Sider 原生 width prop
export function layoutSiderContract(libName, UcLayoutSider) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElAside' : 'ALayoutSider'
  const rootSelector = isElement ? '.el-aside' : '.ant-layout-sider'

  const mountSider = (props = {}) =>
    mount(UcLayoutSider, {
      props,
      slots: { default: '<div class="sider-child">侧栏</div>' },
    })

  describe(`UcLayoutSider 契约 [${libName}]`, () => {
    it('渲染 aside 侧栏与默认插槽', () => {
      const wrapper = mountSider()
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('ASIDE')
      expect(wrapper.find('.sider-child').text()).toBe('侧栏')
    })

    it('默认宽度 300', () => {
      const wrapper = mountSider()
      if (isElement) {
        const style = wrapper.find(rootSelector).attributes('style') || ''
        expect(style).toContain('--el-aside-width: 300px')
      } else {
        expect(wrapper.findComponent({ name: innerName }).props('width')).toBe(300)
      }
    })

    it('number 宽度映射（240）', () => {
      const wrapper = mountSider({ width: 240 })
      if (isElement) {
        const style = wrapper.find(rootSelector).attributes('style') || ''
        expect(style).toContain('--el-aside-width: 240px')
      } else {
        expect(wrapper.findComponent({ name: innerName }).props('width')).toBe(240)
      }
    })

    it('string 宽度原样透传', () => {
      const wrapper = mountSider({ width: '18rem' })
      if (isElement) {
        const style = wrapper.find(rootSelector).attributes('style') || ''
        expect(style).toContain('--el-aside-width: 18rem')
      } else {
        expect(wrapper.findComponent({ name: innerName }).props('width')).toBe('18rem')
      }
    })

    it('底层组件被渲染', () => {
      const wrapper = mountSider()
      expect(wrapper.findComponent({ name: innerName }).exists()).toBe(true)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountSider({ class: 'my-sider' })
      expect(wrapper.html()).toContain('my-sider')
    })
  })
}
