import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSwitch from '../antd/switch'
import { switchContract } from './switch.contract'

switchContract('ant-design-vue', UcSwitch)

describe('UcSwitch ant-design-vue 专属映射', () => {
  it('modelValue=true 映射为 ant-switch-checked', () => {
    const wrapper = mount(UcSwitch, { props: { modelValue: true } })
    expect(wrapper.find('[role="switch"]').classes()).toContain('ant-switch-checked')
  })
})
