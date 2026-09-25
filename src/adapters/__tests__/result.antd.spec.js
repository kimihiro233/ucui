import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcResult from '../antd/result'
import { resultContract } from './result.contract'

resultContract('ant-design-vue', UcResult)

describe('UcResult ant-design-vue 专属映射', () => {
  it('status 直映且根类带状态', () => {
    const wrapper = mount(UcResult, { props: { status: 'warning', title: '警告' } })
    expect(wrapper.findComponent({ name: 'AResult' }).props('status')).toBe('warning')
    expect(wrapper.find('.ant-result-warning').exists()).toBe(true)
  })

  it('extra 插槽渲染在 .ant-result-extra', () => {
    const wrapper = mount(UcResult, {
      props: { title: '标题' },
      slots: { extra: '<button>返回</button>' },
    })
    expect(wrapper.find('.ant-result-extra').exists()).toBe(true)
    expect(wrapper.find('.ant-result-extra').text()).toContain('返回')
  })
})
