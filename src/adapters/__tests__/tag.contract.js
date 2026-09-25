import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcTag 统一契约：所有适配器实现都必须满足这些行为
// 注：关闭按钮类名两端不同（el-tag__close / ant-tag-close-icon），用 [class*="close"] 语义匹配
export function tagContract(name, UcTag) {
  describe(`UcTag 契约 [${name}]`, () => {
    it('渲染插槽内容', () => {
      const wrapper = mount(UcTag, { slots: { default: '标签文本' } })
      expect(wrapper.text()).toContain('标签文本')
    })

    it('默认不渲染关闭按钮', () => {
      const wrapper = mount(UcTag)
      expect(wrapper.find('[class*="close"]').exists()).toBe(false)
    })

    it('closable 时渲染关闭按钮', () => {
      const wrapper = mount(UcTag, { props: { closable: true }, slots: { default: 'x' } })
      expect(wrapper.find('[class*="close"]').exists()).toBe(true)
    })

    it('点击关闭触发 close 事件', async () => {
      const wrapper = mount(UcTag, { props: { closable: true }, slots: { default: 'x' } })
      await wrapper.find('[class*="close"]').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })
}
