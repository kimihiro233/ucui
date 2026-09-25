import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcProgress from '../antd/progress'
import { progressContract } from './progress.contract'

progressContract('ant-design-vue', UcProgress)

describe('UcProgress ant-design-vue 专属映射', () => {
  it('percentage 映射为 percent 并渲染在 ant-progress-text', () => {
    const wrapper = mount(UcProgress, { props: { percentage: 50 } })
    expect(wrapper.find('.ant-progress').exists()).toBe(true)
    expect(wrapper.find('.ant-progress-text').text()).toContain('50')
  })
})
