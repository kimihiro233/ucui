import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcFloatButton 统一契约
// antd 侧包 AFloatButton（.ant-float-btn 结构）；element 侧为原生兜底（.uc-float-btn 结构）
// type('default'|'primary') / shape('circle'|'square') / tooltip / href + @click
// icon 插槽为图标位；default 插槽为描述文本，仅 square 形态渲染
export function floatButtonContract(libName, UcFloatButton) {
  const isElement = libName === 'element-plus'
  const rootSelector = isElement ? '.uc-float-btn' : '.ant-float-btn'

  describe(`UcFloatButton 契约 [${libName}]`, () => {
    it('渲染浮动按钮根节点（默认 button）', () => {
      const wrapper = mount(UcFloatButton)
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('BUTTON')
    })

    it('type/shape 语义类名落到根节点', () => {
      const wrapper = mount(UcFloatButton, { props: { type: 'primary', shape: 'square' } })
      const classes = wrapper.find(rootSelector).classes()
      expect(classes.some((c) => c.includes('float-btn-primary'))).toBe(true)
      expect(classes.some((c) => c.includes('float-btn-square'))).toBe(true)
    })

    it('点击 emit click', async () => {
      const wrapper = mount(UcFloatButton)
      await wrapper.find(rootSelector).trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click').length).toBe(1)
    })

    it('href 渲染为链接并携带 target', () => {
      const wrapper = mount(UcFloatButton, {
        props: { href: 'https://example.com', target: '_blank' },
      })
      const root = wrapper.find(rootSelector)
      expect(root.element.tagName).toBe('A')
      expect(root.attributes('href')).toBe('https://example.com')
      expect(root.attributes('target')).toBe('_blank')
    })

    it('icon 插槽渲染图标位', () => {
      const wrapper = mount(UcFloatButton, {
        slots: { icon: '<span class="fb-mark">★</span>' },
      })
      expect(wrapper.html()).toContain('fb-mark')
    })

    it('square 形态渲染描述文本', () => {
      const wrapper = mount(UcFloatButton, {
        props: { shape: 'square' },
        slots: { default: '新建流程' },
      })
      expect(wrapper.text()).toContain('新建流程')
    })

    it('circle 形态不渲染描述文本', () => {
      const wrapper = mount(UcFloatButton, {
        props: { shape: 'circle' },
        slots: { default: '新建流程' },
      })
      expect(wrapper.text()).not.toContain('新建流程')
    })

    it('tooltip：element 落 title 属性（antd 浮层惰性渲染，由专属 spec 断言）', () => {
      const wrapper = mount(UcFloatButton, { props: { tooltip: '快捷操作' } })
      if (isElement) {
        expect(wrapper.find(rootSelector).attributes('title')).toBe('快捷操作')
      } else {
        expect(wrapper.findComponent({ name: 'AFloatButton' }).props('tooltip')).toBe('快捷操作')
      }
    })

    it('class 逃生舱落到根节点', () => {
      const wrapper = mount(UcFloatButton, { props: { class: 'my-fb' } })
      expect(wrapper.find(rootSelector).classes()).toContain('my-fb')
    })
  })
}
