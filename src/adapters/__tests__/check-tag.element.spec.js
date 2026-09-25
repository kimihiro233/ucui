import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCheckTag from '../element/check-tag'
import { checkTagContract } from './check-tag.contract'

checkTagContract('element-plus', UcCheckTag)

describe('UcCheckTag element-plus 专属映射', () => {
  it('checked/disabled/type 直传 ElCheckTag', () => {
    const wrapper = mount(UcCheckTag, {
      props: { checked: true, disabled: true, type: 'success' },
      slots: { default: () => 'A' },
    })
    const inner = wrapper.findComponent({ name: 'ElCheckTag' })
    expect(inner.props('checked')).toBe(true)
    expect(inner.props('disabled')).toBe(true)
    expect(inner.props('type')).toBe('success')
  })

  it('type=success 挂 el-check-tag--success 类', () => {
    const wrapper = mount(UcCheckTag, {
      props: { type: 'success' },
      slots: { default: () => 'A' },
    })
    expect(wrapper.find('.el-check-tag').classes()).toContain(
      'el-check-tag--success',
    )
  })

  it('disabled 挂 is-disabled 类', () => {
    const wrapper = mount(UcCheckTag, {
      props: { disabled: true },
      slots: { default: () => 'A' },
    })
    expect(wrapper.find('.el-check-tag').classes()).toContain('is-disabled')
  })
})
