import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcInput from '../element/input'
import { inputContract } from './input.contract'

inputContract('element-plus', UcInput)

describe('UcInput element-plus 专属映射', () => {
  it('size=small 映射为 el-input--small', () => {
    const wrapper = mount(UcInput, { props: { size: 'small' } })
    expect(wrapper.find('.el-input--small').exists()).toBe(true)
  })

  it('clearable 映射为 element 的 clearable（出现清除图标结构）', () => {
    const wrapper = mount(UcInput, { props: { modelValue: 'hi', clearable: true } })
    expect(wrapper.html()).toContain('el-input__clear')
  })
})
