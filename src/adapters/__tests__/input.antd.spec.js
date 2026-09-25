import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcInput from '../antd/input'
import { inputContract } from './input.contract'

inputContract('ant-design-vue', UcInput)

describe('UcInput ant-design-vue 专属映射', () => {
  it('size=small 映射为 ant-input-sm', () => {
    const wrapper = mount(UcInput, { props: { size: 'small' } })
    expect(wrapper.find('input').classes()).toContain('ant-input-sm')
  })

  it('size=default 映射为 antd 的中间档（无 sm/lg 类名）', () => {
    const wrapper = mount(UcInput)
    const classes = wrapper.find('input').classes()
    expect(classes).not.toContain('ant-input-sm')
    expect(classes).not.toContain('ant-input-lg')
  })

  it('clearable 映射为 antd 的 allowClear', () => {
    const wrapper = mount(UcInput, { props: { modelValue: 'hi', clearable: true } })
    expect(wrapper.html()).toContain('ant-input-clear-icon')
  })
})
