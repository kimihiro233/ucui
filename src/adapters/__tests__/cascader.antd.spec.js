import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCascader from '../antd/cascader'
import { cascaderContract } from './cascader.contract'

cascaderContract('ant-design-vue', UcCascader)

describe('UcCascader ant-design-vue 专属映射', () => {
  const options = [{ value: 'a', label: 'A' }]

  it('渲染 ant-cascader', () => {
    const wrapper = mount(UcCascader, { props: { options } })
    expect(wrapper.find('.ant-cascader').exists()).toBe(true)
  })

  it('modelValue 映射为 value', () => {
    const wrapper = mount(UcCascader, {
      props: { options, modelValue: ['a'] },
    })
    expect(wrapper.findComponent({ name: 'Cascader' }).props('value')).toEqual(['a'])
  })
})
