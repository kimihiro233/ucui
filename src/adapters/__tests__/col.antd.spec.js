import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCol from '../antd/col'
import { colContract } from './col.contract'

colContract('ant-design-vue', UcCol)

describe('UcCol ant-design-vue 专属映射', () => {
  it('根节点带 ant-col 类', () => {
    const wrapper = mount(UcCol, { slots: { default: '<div>x</div>' } })
    expect(wrapper.find('.ant-col').exists()).toBe(true)
  })

  it('xxl 是 antd 独有断点，经 attrs 逃生舱透传', () => {
    const wrapper = mount(UcCol, {
      props: { xxl: 6 },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.findComponent({ name: 'ACol' }).props('xxl')).toBe(6)
  })
})
