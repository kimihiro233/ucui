import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSpace from '../element/space'
import { spaceContract } from './space.contract'

spaceContract('element-plus', UcSpace)

describe('UcSpace element-plus 专属映射', () => {
  const children = '<div>1</div><div>2</div>'

  it('根节点带 el-space 与方向类', () => {
    const wrapper = mount(UcSpace, {
      props: { direction: 'vertical' },
      slots: { default: children },
    })
    const root = wrapper.find('.el-space')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('el-space--vertical')
  })

  it('fill/fillRatio element 独有能力直映 ElSpace', () => {
    const wrapper = mount(UcSpace, {
      props: { fill: true },
      slots: { default: children },
    })
    const inner = wrapper.findComponent({ name: 'ElSpace' })
    expect(inner.props('fill')).toBe(true)
    expect(inner.props('fillRatio')).toBe(100)
  })
})
