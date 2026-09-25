import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcLayoutContent 统一契约：无 props + 默认插槽（element ElMain / antd Layout.Content）
export function layoutContentContract(libName, UcLayoutContent) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElMain' : 'ALayoutContent'
  const rootSelector = isElement ? '.el-main' : '.ant-layout-content'

  describe(`UcLayoutContent 契约 [${libName}]`, () => {
    it('渲染 main 内容区与默认插槽', () => {
      const wrapper = mount(UcLayoutContent, {
        slots: { default: '<div class="content-child">正文</div>' },
      })
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('MAIN')
      expect(wrapper.find('.content-child').text()).toBe('正文')
    })

    it('底层组件被渲染', () => {
      const wrapper = mount(UcLayoutContent, {
        slots: { default: '<div>正文</div>' },
      })
      expect(wrapper.findComponent({ name: innerName }).exists()).toBe(true)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mount(UcLayoutContent, {
        attrs: { class: 'my-content' },
        slots: { default: '<div>正文</div>' },
      })
      expect(wrapper.html()).toContain('my-content')
    })
  })
}
