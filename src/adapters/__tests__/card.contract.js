import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcCard 统一契约：所有适配器实现都必须满足这些行为
export function cardContract(name, UcCard) {
  const mountCard = (props = {}, slots = {}) =>
    mount(UcCard, {
      props,
      slots: { default: '<p class="card-body">卡片正文</p>', ...slots },
    })

  describe(`UcCard 契约 [${name}]`, () => {
    it('渲染卡片容器', () => {
      const wrapper = mountCard()
      expect(wrapper.find('.el-card, .ant-card').exists()).toBe(true)
    })

    it('渲染默认插槽正文', () => {
      const wrapper = mountCard()
      expect(wrapper.find('.card-body').exists()).toBe(true)
      expect(wrapper.text()).toContain('卡片正文')
    })

    it('渲染 title', () => {
      const wrapper = mountCard({ title: '卡片标题' })
      expect(wrapper.text()).toContain('卡片标题')
    })

    it('渲染 extra 插槽', () => {
      const wrapper = mountCard(
        { title: 't' },
        { extra: '<a class="card-extra">更多</a>' },
      )
      expect(wrapper.find('.card-extra').exists()).toBe(true)
      expect(wrapper.text()).toContain('更多')
    })
  })
}
