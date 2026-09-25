import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcLayoutHeader 统一契约：height(number|string，默认 60) + 默认插槽
// element 用 CSS 变量 --el-header-height；antd 无 height prop，走 inline style.height
export function layoutHeaderContract(libName, UcLayoutHeader) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElHeader' : 'ALayoutHeader'
  const rootSelector = isElement ? '.el-header' : '.ant-layout-header'

  const mountHeader = (props = {}) =>
    mount(UcLayoutHeader, {
      props,
      slots: { default: '<span class="header-child">头部</span>' },
    })

  describe(`UcLayoutHeader 契约 [${libName}]`, () => {
    it('渲染 header 顶栏与默认插槽', () => {
      const wrapper = mountHeader()
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('HEADER')
      expect(wrapper.find('.header-child').text()).toBe('头部')
    })

    it('默认高度 60px', () => {
      const wrapper = mountHeader()
      const style = wrapper.find(rootSelector).attributes('style') || ''
      if (isElement) {
        expect(style).toContain('--el-header-height: 60px')
      } else {
        expect(style).toContain('height: 60px')
      }
    })

    it('number 高度自动补 px（80）', () => {
      const wrapper = mountHeader({ height: 80 })
      const style = wrapper.find(rootSelector).attributes('style') || ''
      if (isElement) {
        expect(style).toContain('--el-header-height: 80px')
      } else {
        expect(style).toContain('height: 80px')
      }
    })

    it('string 高度原样透传', () => {
      const wrapper = mountHeader({ height: '5rem' })
      const style = wrapper.find(rootSelector).attributes('style') || ''
      if (isElement) {
        expect(style).toContain('--el-header-height: 5rem')
      } else {
        expect(style).toContain('height: 5rem')
      }
    })

    it('底层组件被渲染', () => {
      const wrapper = mountHeader()
      expect(wrapper.findComponent({ name: innerName }).exists()).toBe(true)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountHeader({ class: 'my-header' })
      expect(wrapper.html()).toContain('my-header')
    })
  })
}
