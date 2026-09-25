import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTextarea from '../antd/textarea'
import { textareaContract } from './textarea.contract'

textareaContract('ant-design-vue', UcTextarea)

describe('UcTextarea ant-design-vue 专属映射', () => {
  it('渲染 ant-input 结构的 textarea', () => {
    const wrapper = mount(UcTextarea)
    expect(wrapper.find('textarea').classes()).toContain('ant-input')
  })

  it('showCount 显示字数统计', () => {
    const wrapper = mount(UcTextarea, { props: { modelValue: 'hi', maxlength: 10, showCount: true } })
    expect(wrapper.html()).toContain('ant-input-textarea-show-count')
    expect(wrapper.html()).toContain('data-count=')
  })
})
