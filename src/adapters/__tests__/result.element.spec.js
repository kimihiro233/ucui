import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcResult from '../element/result'
import { resultContract } from './result.contract'

resultContract('element-plus', UcResult)

describe('UcResult element-plus 专属映射', () => {
  it('status 映射为 ElResult 的 icon prop', () => {
    const wrapper = mount(UcResult, { props: { status: 'error', title: '失败' } })
    expect(wrapper.findComponent({ name: 'ElResult' }).props('icon')).toBe('error')
  })

  it('extra 插槽渲染在 .el-result__extra', () => {
    const wrapper = mount(UcResult, {
      props: { title: '标题' },
      slots: { extra: '<button>返回</button>' },
    })
    expect(wrapper.find('.el-result__extra').exists()).toBe(true)
    expect(wrapper.find('.el-result__extra').text()).toContain('返回')
  })
})
