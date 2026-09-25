import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcDivider 统一契约：所有适配器实现都必须满足这些行为
// 两端都渲染 div（非 hr），用语义类名子串匹配跨端断言
export function dividerContract(name, UcDivider) {
  const findDivider = (wrapper) => wrapper.find('.el-divider, .ant-divider')

  describe(`UcDivider 契约 [${name}]`, () => {
    it('渲染分割线', () => {
      const wrapper = mount(UcDivider)
      expect(findDivider(wrapper).exists()).toBe(true)
    })

    it('direction=vertical 渲染垂直类名', () => {
      const wrapper = mount(UcDivider, { props: { direction: 'vertical' } })
      expect(findDivider(wrapper).html()).toContain('vertical')
    })

    it('默认插槽文本渲染在分割线上', () => {
      const wrapper = mount(UcDivider, { slots: { default: '分割文本' } })
      expect(wrapper.text()).toContain('分割文本')
    })

    it('orientation=left 文本靠左', () => {
      const wrapper = mount(UcDivider, {
        props: { orientation: 'left' },
        slots: { default: '文本' },
      })
      // element: el-divider__text is-left；antd: ant-divider-with-text-left
      expect(wrapper.html()).toContain('left')
    })

    it('dashed 时使用虚线', () => {
      const wrapper = mount(UcDivider, { props: { dashed: true } })
      // element: border-style dashed（内联样式）；antd: ant-divider-dashed 类名
      expect(wrapper.html()).toContain('dashed')
    })
  })
}
