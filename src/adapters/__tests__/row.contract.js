import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcRow 统一契约：gutter(number)/justify/align(top|middle|bottom) + 默认插槽
// 双端 prop 名一致；gutter>0 时行产生负 margin（两端各分一半间距给列）
export function rowContract(libName, UcRow) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElRow' : 'ARow'
  const rootSelector = isElement ? '.el-row' : '.ant-row'

  const mountRow = (props = {}, slots = {}) =>
    mount(UcRow, {
      props,
      slots: { default: '<div class="row-child">内容</div>', ...slots },
    })

  describe(`UcRow 契约 [${libName}]`, () => {
    it('渲染行容器与默认插槽', () => {
      const wrapper = mountRow()
      expect(wrapper.find(rootSelector).exists()).toBe(true)
      expect(wrapper.find('.row-child').text()).toBe('内容')
    })

    it('gutter 映射到底层并产生负 margin', () => {
      const wrapper = mountRow({ gutter: 20 })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props('gutter')).toBe(20)
      expect(wrapper.find(rootSelector).attributes('style')).toContain('-10px')
    })

    it('justify 映射到底层', () => {
      const wrapper = mountRow({ justify: 'center' })
      expect(wrapper.findComponent({ name: innerName }).props('justify')).toBe('center')
    })

    it('align 映射到底层', () => {
      const wrapper = mountRow({ align: 'middle' })
      expect(wrapper.findComponent({ name: innerName }).props('align')).toBe('middle')
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountRow({ class: 'my-row' })
      expect(wrapper.html()).toContain('my-row')
    })
  })
}
