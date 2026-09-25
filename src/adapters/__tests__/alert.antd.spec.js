import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAlert from '../antd/alert'
import { alertContract } from './alert.contract'

alertContract('ant-design-vue', UcAlert)

describe('UcAlert ant-design-vue 专属映射', () => {
  it('type 映射为 ant-alert-success 类名', () => {
    const wrapper = mount(UcAlert, { props: { title: 't', type: 'success' } })
    expect(wrapper.find('.ant-alert').classes()).toContain('ant-alert-success')
  })

  it('title 透传为 message 渲染', () => {
    const wrapper = mount(UcAlert, { props: { title: '提示', type: 'info' } })
    expect(wrapper.find('.ant-alert-message').text()).toContain('提示')
  })
})
