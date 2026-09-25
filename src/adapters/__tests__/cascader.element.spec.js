import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCascader from '../element/cascader'
import { cascaderContract } from './cascader.contract'

cascaderContract('element-plus', UcCascader)

describe('UcCascader element-plus 专属映射', () => {
  const options = [{ value: 'a', label: 'A' }]

  it('渲染 el-cascader', () => {
    const wrapper = mount(UcCascader, { props: { options } })
    expect(wrapper.find('.el-cascader').exists()).toBe(true)
  })

  it('默认 emitPath 返回路径数组', () => {
    const wrapper = mount(UcCascader, {
      props: { options, modelValue: ['a'] },
    })
    expect(
      wrapper.findComponent({ name: 'ElCascader' }).props('modelValue'),
    ).toEqual(['a'])
  })
})
