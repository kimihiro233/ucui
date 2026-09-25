import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRadio from '../element/radio'
import { radioContract } from './radio.contract'

radioContract('element-plus', UcRadio)

describe('UcRadio element-plus 专属映射', () => {
  it('modelValue=true 映射为 is-checked', () => {
    const wrapper = mount(UcRadio, { props: { modelValue: true } })
    expect(wrapper.html()).toContain('is-checked')
  })
})
