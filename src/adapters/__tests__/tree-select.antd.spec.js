import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTreeSelect from '../antd/tree-select'
import { treeSelectContract } from './tree-select.contract'

treeSelectContract('ant-design-vue', UcTreeSelect)

describe('UcTreeSelect ant-design-vue 专属映射', () => {
  const options = [{ value: 'a', label: 'A' }]

  it('options 映射为 treeData', () => {
    const wrapper = mount(UcTreeSelect, { props: { options } })
    expect(wrapper.findComponent({ name: 'TreeSelect' }).props('treeData')).toEqual(options)
  })

  it('modelValue 映射为 value，clearable 映射为 allowClear', () => {
    const wrapper = mount(UcTreeSelect, {
      props: { options, modelValue: 'a', clearable: true },
    })
    const comp = wrapper.findComponent({ name: 'TreeSelect' })
    expect(comp.props('value')).toBe('a')
    expect(comp.props('allowClear')).toBe(true)
  })
})
