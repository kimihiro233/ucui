import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSwitch from '../element/switch'
import { switchContract } from './switch.contract'

switchContract('element-plus', UcSwitch)

describe('UcSwitch element-plus 专属映射', () => {
  it('modelValue=true 映射为 is-checked', () => {
    const wrapper = mount(UcSwitch, { props: { modelValue: true } })
    expect(wrapper.find('.el-switch').classes()).toContain('is-checked')
  })
})
