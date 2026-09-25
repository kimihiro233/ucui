import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLink from '../element/link'
import { linkContract } from './link.contract'

linkContract('element-plus', UcLink)

describe('UcLink element-plus 专属映射', () => {
  it('type/underline/href/target 直映 ElLink', () => {
    const wrapper = mount(UcLink, {
      props: { type: 'success', underline: 'never', href: '#x', target: '_blank' },
      slots: { default: '文字' },
    })
    const inner = wrapper.findComponent({ name: 'ElLink' })
    expect(inner.props('type')).toBe('success')
    expect(inner.props('underline')).toBe('never')
    expect(inner.props('href')).toBe('#x')
    expect(inner.props('target')).toBe('_blank')
  })

  it('disabled 时 href 从 a 标签移除', () => {
    const wrapper = mount(UcLink, {
      props: { href: '#x', disabled: true },
      slots: { default: '文字' },
    })
    expect(wrapper.find('a').attributes('href')).toBeUndefined()
  })

  it('underline 字符串模式不触发布尔废弃告警（无 warning）', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(UcLink, {
      props: { underline: 'always' },
      slots: { default: '文字' },
    })
    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('underline option (boolean)'),
      expect.anything(),
    )
    warn.mockRestore()
  })
})
