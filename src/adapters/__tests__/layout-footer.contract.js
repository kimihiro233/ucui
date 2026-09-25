import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcLayoutFooter 统一契约：height(number|string，默认 60) + 默认插槽
// element 用 CSS 变量 --el-footer-height；antd 无 height prop，走 inline style.height
export function layoutFooterContract(libName, UcLayoutFooter) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElFooter' : 'ALayoutFooter'
  const rootSelector = isElement ? '.el-footer' : '.ant-layout-footer'

  const mountFooter = (props = {}) =>
    mount(UcLayoutFooter, {
      props,
      slots: { default: '<span class="footer-child">底部</span>' },
    })

  describe(`UcLayoutFooter 契约 [${libName}]`, () => {
    it('渲染 footer 底栏与默认插槽', () => {
      const wrapper = mountFooter()
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('FOOTER')
      expect(wrapper.find('.footer-child').text()).toBe('底部')
    })

    it('默认高度 60px', () => {
      const wrapper = mountFooter()
      const style = wrapper.find(rootSelector).attributes('style') || ''
      if (isElement) {
        expect(style).toContain('--el-footer-height: 60px')
      } else {
        expect(style).toContain('height: 60px')
      }
    })

    it('number 高度自动补 px（48）', () => {
      const wrapper = mountFooter({ height: 48 })
      const style = wrapper.find(rootSelector).attributes('style') || ''
      if (isElement) {
        expect(style).toContain('--el-footer-height: 48px')
      } else {
        expect(style).toContain('height: 48px')
      }
    })

    it('string 高度原样透传', () => {
      const wrapper = mountFooter({ height: '4rem' })
      const style = wrapper.find(rootSelector).attributes('style') || ''
      if (isElement) {
        expect(style).toContain('--el-footer-height: 4rem')
      } else {
        expect(style).toContain('height: 4rem')
      }
    })

    it('底层组件被渲染', () => {
      const wrapper = mountFooter()
      expect(wrapper.findComponent({ name: innerName }).exists()).toBe(true)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountFooter({ class: 'my-footer' })
      expect(wrapper.html()).toContain('my-footer')
    })
  })
}
