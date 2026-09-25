import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcProgress from '../element/progress'
import { progressContract } from './progress.contract'

progressContract('element-plus', UcProgress)

describe('UcProgress element-plus 专属映射', () => {
  it('percentage 渲染在 el-progress__text', () => {
    const wrapper = mount(UcProgress, { props: { percentage: 50 } })
    expect(wrapper.find('.el-progress').exists()).toBe(true)
    expect(wrapper.find('.el-progress__text').text()).toContain('50')
  })
})
