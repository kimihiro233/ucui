import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTreeSelect from '../element/tree-select'
import { treeSelectContract } from './tree-select.contract'

treeSelectContract('element-plus', UcTreeSelect)

describe('UcTreeSelect element-plus 专属映射', () => {
  const options = [{ value: 'a', label: 'A' }]

  it('options 映射为 data', () => {
    const wrapper = mount(UcTreeSelect, { props: { options } })
    expect(wrapper.findComponent({ name: 'ElTreeSelect' }).props('data')).toEqual(options)
  })

  it('clearable 直映', () => {
    const wrapper = mount(UcTreeSelect, {
      props: { options, clearable: true },
    })
    expect(wrapper.findComponent({ name: 'ElTreeSelect' }).props('clearable')).toBe(true)
  })
})
