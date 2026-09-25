import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCheckbox from '../element/checkbox'
import { checkboxContract } from './checkbox.contract'

checkboxContract('element-plus', UcCheckbox)

describe('UcCheckbox element-plus 专属映射', () => {
  it('modelValue=true 映射为 is-checked', () => {
    const wrapper = mount(UcCheckbox, { props: { modelValue: true } })
    expect(wrapper.html()).toContain('is-checked')
  })
})
