import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTimeline from '../element/timeline'
import { timelineContract } from './timeline.contract'

timelineContract('element-plus', UcTimeline)

describe('UcTimeline element-plus 专属映射', () => {
  const items = [
    { content: '一', timestamp: 't1' },
    { content: '二', timestamp: 't2' },
  ]

  it('timestamp 映射为 ElTimelineItem prop', () => {
    const wrapper = mount(UcTimeline, { props: { items } })
    const times = wrapper.findAll('.el-timeline-item__timestamp')
    expect(times[0].text()).toContain('t1')
    expect(times[1].text()).toContain('t2')
  })

  it('mode 透传', () => {
    const wrapper = mount(UcTimeline, { props: { items, mode: 'alternate' } })
    expect(wrapper.findComponent({ name: 'ElTimeline' }).props('mode')).toBe('alternate')
  })
})
