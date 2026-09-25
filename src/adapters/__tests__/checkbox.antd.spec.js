import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCheckbox from '../antd/checkbox'
import { checkboxContract } from './checkbox.contract'

checkboxContract('ant-design-vue', UcCheckbox)

describe('UcCheckbox ant-design-vue 专属映射', () => {
  it('modelValue=true 映射为 ant-checkbox-checked', () => {
    const wrapper = mount(UcCheckbox, { props: { modelValue: true } })
    expect(wrapper.html()).toContain('ant-checkbox-checked')
  })
})
