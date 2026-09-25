import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcTimeline 统一契约：所有适配器实现都必须满足这些行为
export function timelineContract(name, UcTimeline) {
  const items = [
    { content: '节点一', timestamp: '2026-09-01' },
    { content: '节点二', timestamp: '2026-09-10' },
  ]

  describe(`UcTimeline 契约 [${name}]`, () => {
    it('渲染时间线容器', () => {
      const wrapper = mount(UcTimeline, { props: { items } })
      expect(wrapper.find('.el-timeline, .ant-timeline').exists()).toBe(true)
    })

    it('渲染所有节点内容', () => {
      const wrapper = mount(UcTimeline, { props: { items } })
      expect(wrapper.text()).toContain('节点一')
      expect(wrapper.text()).toContain('节点二')
    })

    it('渲染时间戳', () => {
      const wrapper = mount(UcTimeline, { props: { items } })
      expect(wrapper.text()).toContain('2026-09-01')
      expect(wrapper.text()).toContain('2026-09-10')
    })

    it('节点数量与 items 一致', () => {
      const wrapper = mount(UcTimeline, { props: { items } })
      expect(wrapper.findAll('.el-timeline-item, .ant-timeline-item').length).toBe(2)
    })
  })
}
