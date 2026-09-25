import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcFlex 契约：两端都必须满足的布局行为
// 范式差异断言分支：element 兜底=内联 style；antd 原生=类名（ant-flex-*）
export function flexContract(libName, UcFlex) {
  const isElement = libName === 'element-plus'
  describe(`UcFlex 契约 [${libName}]`, () => {
    const mountFlex = (props = {}) =>
      mount(UcFlex, { props, slots: { default: '<span>flex内容</span>' } })
    const root = (w) => w.find(isElement ? '.uc-flex' : '.ant-flex')

    it('默认渲染容器并展示插槽内容', () => {
      const w = mountFlex()
      expect(root(w).exists()).toBe(true)
      expect(w.text()).toContain('flex内容')
      w.unmount()
    })

    it('vertical 纵向排列（element 内联 style / antd 类名）', () => {
      const w = mountFlex({ vertical: true })
      if (isElement) {
        expect(root(w).attributes('style') || '').toContain('flex-direction: column')
      } else {
        expect(root(w).classes()).toContain('ant-flex-vertical')
      }
      w.unmount()
    })

    it('justify/align 映射', () => {
      const w = mountFlex({ justify: 'center', align: 'center' })
      if (isElement) {
        const style = root(w).attributes('style') || ''
        expect(style).toContain('justify-content: center')
        expect(style).toContain('align-items: center')
      } else {
        const cls = root(w).classes()
        expect(cls).toContain('ant-flex-justify-center')
        expect(cls).toContain('ant-flex-align-center')
      }
      w.unmount()
    })

    it('gap 档位 small（element 8px 内联 / antd 档位类）', () => {
      const w = mountFlex({ gap: 'small' })
      if (isElement) {
        expect(root(w).attributes('style') || '').toContain('gap: 8px')
      } else {
        expect(root(w).classes()).toContain('ant-flex-gap-small')
      }
      w.unmount()
    })

    it('gap 数字 20 → gap: 20px（双端内联 style）', () => {
      const w = mountFlex({ gap: 20 })
      expect(root(w).attributes('style') || '').toContain('gap: 20px')
      w.unmount()
    })

    it('flex 属性 → style flex（双端，happy-dom 序列化为长属性）', () => {
      const w = mountFlex({ flex: 'auto' })
      // happy-dom 把 flex 简写拆成 flex-grow/flex-shrink/flex-basis 长属性（踩坑 61 同款），断言长属性
      const style = (root(w).attributes('style') || '').replace(/\s/g, '')
      expect(style).toContain('flex-grow:1')
      expect(style).toContain('flex-basis:auto')
      w.unmount()
    })

    it('tag 自定义标签（双端渲染 section）', () => {
      const w = mount(UcFlex, { props: { tag: 'section' }, slots: { default: 'x' } })
      expect(w.element.tagName).toBe('SECTION')
      w.unmount()
    })

    it('class 逃生舱透传根节点', () => {
      const w = mount(UcFlex, { attrs: { class: 'my-flex' }, slots: { default: 'x' } })
      expect(root(w).classes()).toContain('my-flex')
      w.unmount()
    })
  })
}
