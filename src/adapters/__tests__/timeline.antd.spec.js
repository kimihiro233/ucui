import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTimeline from '../antd/timeline'
import { timelineContract } from './timeline.contract'

timelineContract('ant-design-vue', UcTimeline)

describe('UcTimeline ant-design-vue 专属映射', () => {
  const items = [
    { content: '一', timestamp: 't1' },
    { content: '二' },
  ]

  it('无 timestamp 时不渲染时间节点', () => {
    const wrapper = mount(UcTimeline, { props: { items } })
    expect(wrapper.find('.uc-timeline-time').text()).toContain('t1')
    expect(wrapper.findAll('.uc-timeline-time').length).toBe(1)
  })

  it('color 映射为 TimelineItem color', () => {
    const wrapper = mount(UcTimeline, {
      props: { items: [{ content: 'x', color: 'red' }] },
    })
    expect(wrapper.find('.ant-timeline-item-head-red').exists()).toBe(true)
  })
})
