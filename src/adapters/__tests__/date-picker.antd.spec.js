import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcDatePicker from '../antd/date-picker'
import { datePickerContract } from './date-picker.contract'

datePickerContract('ant-design-vue', UcDatePicker)

describe('UcDatePicker ant-design-vue 专属映射', () => {
  it('modelValue 映射为 value，clearable 映射为 allowClear', () => {
    const wrapper = mount(UcDatePicker, {
      props: { modelValue: '2026-01-01', clearable: false },
    })
    const picker = wrapper.findComponent({ name: 'ADatePicker' })
    expect(picker.props('value')).toBe('2026-01-01')
    expect(picker.props('allowClear')).toBe(false)
  })

  it('valueFormat 与 format 一致', () => {
    const wrapper = mount(UcDatePicker, { props: { modelValue: '' } })
    const picker = wrapper.findComponent({ name: 'ADatePicker' })
    expect(picker.props('valueFormat')).toBe('YYYY-MM-DD')
  })
})
