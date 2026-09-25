import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayout from '../antd/layout'
import { layoutContract } from './layout.contract'

layoutContract('ant-design-vue', UcLayout)

describe('UcLayout ant-design-vue 专属映射', () => {
  it('direction=vertical 时 hasSider=false', () => {
    const wrapper = mount(UcLayout, {
      props: { direction: 'vertical' },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.findComponent({ name: 'ALayout' }).props('hasSider')).toBe(false)
  })

  it('direction=horizontal 时 hasSider=true', () => {
    const wrapper = mount(UcLayout, {
      props: { direction: 'horizontal' },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.findComponent({ name: 'ALayout' }).props('hasSider')).toBe(true)
  })
})
