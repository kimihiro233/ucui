import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcBadge 统一契约：所有适配器实现都必须满足这些行为
// 注：圆点类名两端不同（is-dot / ant-badge-dot），用 [class*="dot"] 语义匹配
export function badgeContract(name, UcBadge) {
  describe(`UcBadge 契约 [${name}]`, () => {
    it('渲染包裹内容', () => {
      const wrapper = mount(UcBadge, {
        props: { value: 5 },
        slots: { default: '<span class="badge-child">消息</span>' },
      })
      expect(wrapper.find('.badge-child').exists()).toBe(true)
    })

    it('渲染数值', () => {
      const wrapper = mount(UcBadge, { props: { value: 5 } })
      expect(wrapper.text()).toContain('5')
    })

    it('max 溢出显示 99+', () => {
      const wrapper = mount(UcBadge, { props: { value: 100, max: 99 } })
      expect(wrapper.text()).toContain('99+')
    })

    it('dot 模式渲染圆点', () => {
      const wrapper = mount(UcBadge, {
        props: { dot: true },
        slots: { default: '<span class="badge-child">msg</span>' },
      })
      expect(wrapper.find('[class*="dot"]').exists()).toBe(true)
    })
  })
}
