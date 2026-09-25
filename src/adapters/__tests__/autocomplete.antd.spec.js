import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcAutoComplete from '../antd/autocomplete'
import { autoCompleteContract } from './autocomplete.contract'

const fetchSuggestions = (query, cb) =>
  cb([{ value: `suggestion-${query}-1` }, { value: `suggestion-${query}-2` }])

autoCompleteContract('ant-design-vue', UcAutoComplete)

describe('UcAutoComplete ant-design-vue 专属映射', () => {
  it('内部使用 AAutoComplete', () => {
    const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions } })
    expect(wrapper.findComponent({ name: 'AAutoComplete' }).exists()).toBe(true)
  })

  it('fetchSuggestions 结果桥接为 options（补 label）', async () => {
    const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions } })
    await wrapper.find('input').setValue('x')
    await flushPromises()
    const inner = wrapper.findComponent({ name: 'AAutoComplete' })
    expect(inner.props('options')).toEqual([
      { value: 'suggestion-x-1', label: 'suggestion-x-1' },
      { value: 'suggestion-x-2', label: 'suggestion-x-2' },
    ])
  })

  it('focus 时也会拉取一次建议（对齐 element triggerOnFocus）', async () => {
    let calls = 0
    const spy = (q, cb) => {
      calls += 1
      cb([])
    }
    const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions: spy } })
    await wrapper.find('input').trigger('focus')
    await flushPromises()
    expect(calls).toBeGreaterThan(0)
  })
})
