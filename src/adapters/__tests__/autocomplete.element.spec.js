import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAutoComplete from '../element/autocomplete'
import { autoCompleteContract } from './autocomplete.contract'

const fetchSuggestions = (query, cb) => cb([{ value: 'a' }])

autoCompleteContract('element-plus', UcAutoComplete)

describe('UcAutoComplete element-plus 专属映射', () => {
  it('渲染 el-autocomplete 结构', () => {
    const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions } })
    expect(wrapper.find('.el-autocomplete').exists()).toBe(true)
  })

  it('size=small 映射为 el-input--small', () => {
    const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions, size: 'small' } })
    expect(wrapper.find('.el-input--small').exists()).toBe(true)
  })
})
