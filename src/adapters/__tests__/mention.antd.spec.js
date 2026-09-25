import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcMentions from '../antd/mention'
import { mentionsContract } from './mention.contract'

const options = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
]

mentionsContract('ant-design-vue', UcMentions)

describe('UcMentions ant-design-vue 专属映射', () => {
  it('内部使用 AMentions 且 options 透传', () => {
    const wrapper = mount(UcMentions, { props: { options } })
    const inner = wrapper.findComponent({ name: 'AMentions' })
    expect(inner.exists()).toBe(true)
    expect(inner.props('options')).toEqual(options)
  })

  it('modelValue 映射为 value', () => {
    const wrapper = mount(UcMentions, { props: { options, modelValue: 'hi' } })
    expect(wrapper.findComponent({ name: 'AMentions' }).props('value')).toBe('hi')
  })
})
