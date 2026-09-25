import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRow from '../antd/row'
import { rowContract } from './row.contract'

rowContract('ant-design-vue', UcRow)

describe('UcRow ant-design-vue 专属映射', () => {
  it('根节点带 ant-row 及 justify 修饰类', () => {
    const wrapper = mount(UcRow, {
      props: { justify: 'space-between' },
      slots: { default: '<div>x</div>' },
    })
    const root = wrapper.find('.ant-row')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('ant-row-space-between')
  })

  it('wrap=false 是 antd 增强能力，经 attrs 逃生舱透传', () => {
    const wrapper = mount(UcRow, {
      props: { wrap: false },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.findComponent({ name: 'ARow' }).props('wrap')).toBe(false)
  })
})
