import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcDatePicker from '../element/date-picker'
import { datePickerContract } from './date-picker.contract'

datePickerContract('element-plus', UcDatePicker)

describe('UcDatePicker element-plus 专属映射', () => {
  it('format 同时映射到 format 与 valueFormat', () => {
    const wrapper = mount(UcDatePicker, {
      props: { modelValue: '', format: 'YYYY/MM/DD' },
    })
    const picker = wrapper.findComponent({ name: 'ElDatePicker' })
    expect(picker.props('format')).toBe('YYYY/MM/DD')
    expect(picker.props('valueFormat')).toBe('YYYY/MM/DD')
  })

  it('clearable 直映', () => {
    const wrapper = mount(UcDatePicker, {
      props: { modelValue: '', clearable: false },
    })
    expect(wrapper.findComponent({ name: 'ElDatePicker' }).props('clearable')).toBe(false)
  })
})
