import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcDropdown from '../element/dropdown'
import { dropdownContract } from './dropdown.contract'

dropdownContract('element-plus', UcDropdown)

describe('UcDropdown element-plus 专属映射', () => {
  const items = [
    { label: '一', key: 'a' },
    { label: '二', key: 'b' },
  ]

  it('渲染触发元素', () => {
    const wrapper = mount(UcDropdown, {
      props: { items },
      slots: { default: '<span class="t">x</span>' },
    })
    expect(wrapper.find('.t').exists()).toBe(true)
  })

  it('command 事件透传菜单项 key', async () => {
    const wrapper = mount(UcDropdown, {
      props: { items, trigger: 'click' },
      slots: { default: '<span class="t">x</span>' },
    })
    // 直接触发 ElDropdown 的 command
    wrapper.findComponent({ name: 'ElDropdown' }).vm.$emit('command', 'b')
    await flushPromises()
    expect(wrapper.emitted('command')).toBeTruthy()
    expect(wrapper.emitted('command')[0]).toEqual(['b'])
  })
})
