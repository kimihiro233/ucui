import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRadio from '../antd/radio'
import { radioContract } from './radio.contract'

radioContract('ant-design-vue', UcRadio)

describe('UcRadio ant-design-vue 专属映射', () => {
  it('modelValue=true 映射为 ant-radio-checked', () => {
    const wrapper = mount(UcRadio, { props: { modelValue: true } })
    expect(wrapper.html()).toContain('ant-radio-wrapper-checked')
  })
})
