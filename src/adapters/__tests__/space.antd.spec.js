import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSpace from '../antd/space'
import { spaceContract } from './space.contract'

spaceContract('ant-design-vue', UcSpace)

describe('UcSpace ant-design-vue 专属映射', () => {
  const children = '<div>1</div><div>2</div>'

  it('根节点带 ant-space 与垂直方向类', () => {
    const wrapper = mount(UcSpace, {
      props: { direction: 'vertical' },
      slots: { default: children },
    })
    const root = wrapper.find('.ant-space')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('ant-space-vertical')
  })

  it('large/small 档位原样透传', () => {
    const wrapper = mount(UcSpace, {
      props: { size: 'large' },
      slots: { default: children },
    })
    expect(wrapper.findComponent({ name: 'ASpace' }).props('size')).toBe('large')
  })

  it('fill 是 element 独有能力，不透传给 ASpace', () => {
    const wrapper = mount(UcSpace, {
      props: { fill: true },
      slots: { default: children },
    })
    expect(wrapper.findComponent({ name: 'ASpace' }).props('fill')).toBeUndefined()
  })
})
