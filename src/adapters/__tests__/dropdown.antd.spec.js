import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcDropdown from '../antd/dropdown'
import { dropdownContract } from './dropdown.contract'

dropdownContract('ant-design-vue', UcDropdown)

describe('UcDropdown ant-design-vue 专属映射', () => {
  const items = [
    { label: '一', key: 'a' },
    { label: '二', key: 'b' },
  ]

  it('trigger 映射为数组', () => {
    const wrapper = mount(UcDropdown, {
      props: { items, trigger: 'click' },
      slots: { default: '<span class="t">x</span>' },
    })
    expect(wrapper.findComponent({ name: 'ADropdown' }).props('trigger')).toEqual(['click'])
  })

  it('items 映射到 menu.items，onClick 归一化为 command', async () => {
    const wrapper = mount(UcDropdown, {
      props: { items },
      slots: { default: '<span class="t">x</span>' },
    })
    const menu = wrapper.findComponent({ name: 'ADropdown' }).props('menu')
    // antd 内部会加工 menu 对象，用 toEqual 比较内容
    expect(menu.items).toEqual(items)
    menu.onClick({ key: 'a' })
    await flushPromises()
    expect(wrapper.emitted('command')[0]).toEqual(['a'])
  })
})
