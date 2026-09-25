import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcLink 统一契约：type(default|primary|success|warning|danger)/href/target/disabled/
// underline(always|hover|never，默认 hover) + @click(event)
// antd Typography.Link 是函数式组件（无实例），契约统一走 DOM 断言
export function linkContract(libName, UcLink) {
  const isElement = libName === 'element-plus'

  const mountLink = (props = {}, slots = {}) =>
    mount(UcLink, {
      props: { href: 'https://example.com', ...props },
      slots: { default: '链接文本', ...slots },
    })

  describe(`UcLink 契约 [${libName}]`, () => {
    it('渲染 a 标签、文本与 href/target', () => {
      const wrapper = mountLink({ target: '_blank' })
      const anchor = wrapper.find('a')
      expect(anchor.exists()).toBe(true)
      expect(anchor.text()).toContain('链接文本')
      expect(anchor.attributes('href')).toBe('https://example.com')
      expect(anchor.attributes('target')).toBe('_blank')
    })

    it('type 映射为语义色类名', () => {
      const wrapper = mountLink({ type: 'danger' })
      const classes = wrapper.find('a').classes()
      expect(classes.some((c) => c.includes('danger'))).toBe(true)
    })

    it('disabled 时带禁用类名', () => {
      const wrapper = mountLink({ disabled: true })
      const classes = wrapper.find('a').classes()
      expect(classes.some((c) => c.includes('disabled'))).toBe(true)
    })

    it('underline=always 常显下划线', () => {
      const wrapper = mountLink({ underline: 'always' })
      if (isElement) {
        expect(wrapper.find('a').classes()).toContain('is-underline')
      } else {
        // antd 下划线是 <u> 标签包裹内容，不是类名
        expect(wrapper.find('a u').exists()).toBe(true)
      }
    })

    it('默认 underline=hover：element 悬浮类，antd 不加常显类', () => {
      const wrapper = mountLink()
      const classes = wrapper.find('a').classes()
      if (isElement) {
        expect(classes).toContain('is-hover-underline')
      } else {
        expect(classes).not.toContain('ant-typography-underline')
      }
    })

    it('点击归一化为 click(event)', async () => {
      const wrapper = mountLink()
      await wrapper.find('a').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(MouseEvent)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountLink({ class: 'my-link' })
      expect(wrapper.html()).toContain('my-link')
    })
  })
}
