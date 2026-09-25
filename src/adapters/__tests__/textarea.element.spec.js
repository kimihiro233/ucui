import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTextarea from '../element/textarea'
import { textareaContract } from './textarea.contract'

textareaContract('element-plus', UcTextarea)

describe('UcTextarea element-plus 专属映射', () => {
  it('渲染 el-textarea 结构', () => {
    const wrapper = mount(UcTextarea)
    expect(wrapper.find('.el-textarea').exists()).toBe(true)
  })

  it('maxlength 映射为原生 attribute', () => {
    const wrapper = mount(UcTextarea, { props: { maxlength: 10 } })
    expect(wrapper.find('textarea').attributes('maxlength')).toBe('10')
  })

  it('showCount 映射为 show-word-limit', () => {
    const wrapper = mount(UcTextarea, { props: { modelValue: 'hi', maxlength: 10, showCount: true } })
    expect(wrapper.html()).toContain('el-input__count')
  })
})
