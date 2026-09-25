import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcMentions from '../element/mention'
import { mentionsContract } from './mention.contract'

const options = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
]

mentionsContract('element-plus', UcMentions)

describe('UcMentions element-plus 专属映射', () => {
  it('渲染 el-mention 结构', () => {
    const wrapper = mount(UcMentions, { props: { options } })
    expect(wrapper.find('.el-mention').exists()).toBe(true)
  })

  it('options/prefix 透传给 ElMention', () => {
    const wrapper = mount(UcMentions, { props: { options, prefix: '#' } })
    const inner = wrapper.findComponent({ name: 'ElMention' })
    expect(inner.props('options')).toEqual(options)
    expect(inner.props('prefix')).toBe('#')
  })
})
