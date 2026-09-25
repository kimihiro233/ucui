import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAlert from '../element/alert'
import { alertContract } from './alert.contract'

alertContract('element-plus', UcAlert)

describe('UcAlert element-plus 专属映射', () => {
  it('type 映射为 el-alert--success 类名', () => {
    const wrapper = mount(UcAlert, { props: { title: 't', type: 'success' } })
    expect(wrapper.find('.el-alert').classes()).toContain('el-alert--success')
  })
})
