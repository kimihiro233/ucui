import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

// UcAnchor 统一契约：
// items=[{key?,href,title,children?}]/direction(vertical|horizontal)/offset/bound/container
// + @change(href) @click(href, event)
// element：ElAnchorLink 递归（嵌套走 sub-link 插槽，仅 vertical 渲染）
// antd：原生 items 数组（offset→offsetTop、bound→bounds）
export function anchorContract(libName, UcAnchor) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElAnchor' : 'AAnchor'

  const sampleItems = [
    { href: '#a', title: '章节A' },
    { href: '#b', title: '章节B' },
    {
      href: '#c',
      title: '章节C',
      children: [{ href: '#c1', title: '子节C1' }],
    },
  ]

  const mountAnchor = (props = {}) =>
    mount(UcAnchor, { props: { items: sampleItems, ...props } })

  afterEach(() => {
    document.querySelectorAll('.anchor-target').forEach((n) => n.remove())
  })

  describe(`UcAnchor 契约 [${libName}]`, () => {
    it('渲染全部链接（含嵌套）的文本与 href', () => {
      const wrapper = mountAnchor()
      const links = wrapper.findAll('a[href]')
      const hrefs = links.map((a) => a.attributes('href'))
      expect(hrefs).toContain('#a')
      expect(hrefs).toContain('#b')
      expect(hrefs).toContain('#c')
      expect(hrefs).toContain('#c1')
      const texts = links.map((a) => a.text())
      expect(texts.some((t) => t.includes('章节A'))).toBe(true)
      expect(texts.some((t) => t.includes('子节C1'))).toBe(true)
    })

    it('direction / offset / bound 映射到底层', () => {
      const wrapper = mountAnchor({ direction: 'horizontal', offset: 60, bound: 20 })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props('direction')).toBe('horizontal')
      if (isElement) {
        expect(inner.props('offset')).toBe(60)
        expect(inner.props('bound')).toBe(20)
      } else {
        expect(inner.props('offsetTop')).toBe(60)
        expect(inner.props('bounds')).toBe(20)
      }
    })

    it('container 字符串选择器归一化：element 直映，antd 转为 getContainer 函数', () => {
      const box = document.createElement('div')
      box.className = 'anchor-target'
      document.body.appendChild(box)

      const wrapper = mountAnchor({ container: '.anchor-target' })
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        expect(inner.props('container')).toBe('.anchor-target')
      } else {
        const getContainer = inner.props('getContainer')
        expect(typeof getContainer).toBe('function')
        expect(getContainer()).toBe(box)
      }
    })

    it('激活链接变化归一化为 change(href)', () => {
      const wrapper = mountAnchor()
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        // ElAnchor 声明了 emits，监听器不在 props 上
        inner.vm.$emit('change', '#b')
      } else {
        inner.props('onChange')('#b')
      }
      expect(wrapper.emitted('change')[0]).toEqual(['#b'])
    })

    it('点击事件统一为 click(href, event)', () => {
      const wrapper = mountAnchor()
      const inner = wrapper.findComponent({ name: innerName })
      const event = new MouseEvent('click')
      if (isElement) {
        // element 原始参数顺序 (event, href)
        inner.vm.$emit('click', event, '#a')
      } else {
        inner.props('onClick')(event, { href: '#a', title: '章节A' })
      }
      expect(wrapper.emitted('click')[0][0]).toBe('#a')
      expect(wrapper.emitted('click')[0][1]).toBe(event)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountAnchor({ class: 'my-anchor' })
      expect(wrapper.html()).toContain('my-anchor')
    })
  })
}
