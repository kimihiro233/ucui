import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

/**
 * UcButton 统一契约测试：所有适配器实现都必须通过这组断言
 * 底层库升级后跑一遍，映射失效会立刻暴露
 *
 * @param {string} name 适配器名称（用于测试报告）
 * @param {object} UcButton 适配器提供的统一按钮组件
 */
export function buttonContract(name, UcButton) {
  describe(`UcButton 契约 [${name}]`, () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(UcButton, {
        slots: { default: '确定' },
      })
      // antd 会在两个汉字间自动插入空格，比较前去掉空白
      expect(wrapper.text().replace(/\s+/g, '')).toContain('确定')
    })

    it.each(['primary', 'default', 'danger'])('接受统一 type="%s"', (type) => {
      const wrapper = mount(UcButton, { props: { type } })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('text 作为独立属性生效', () => {
      const wrapper = mount(UcButton, { props: { text: true } })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('link 作为独立属性生效', () => {
      const wrapper = mount(UcButton, { props: { link: true } })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('text 与 type 正交组合（type=danger + text）', () => {
      const wrapper = mount(UcButton, { props: { type: 'danger', text: true } })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('link 与 type 正交组合（type=danger + link）', () => {
      const wrapper = mount(UcButton, { props: { type: 'danger', link: true } })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it.each(['large', 'default', 'small'])('接受统一 size="%s"', (size) => {
      const wrapper = mount(UcButton, { props: { size } })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcButton, { props: { disabled: true } })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('统一向外抛 click 事件', async () => {
      const wrapper = mount(UcButton)
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('透传底层库原生 props（逃生舱）', () => {
      const wrapper = mount(UcButton, {
        attrs: { 'data-testid': 'escape-hatch' },
      })
      expect(wrapper.find('button').attributes('data-testid')).toBe('escape-hatch')
    })
  })
}
