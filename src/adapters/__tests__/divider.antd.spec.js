import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcDivider from '../antd/divider'
import { dividerContract } from './divider.contract'

dividerContract('ant-design-vue', UcDivider)

describe('UcDivider ant-design-vue 专属映射', () => {
  it('渲染 ant-divider', () => {
    const wrapper = mount(UcDivider)
    expect(wrapper.find('.ant-divider').exists()).toBe(true)
  })

  it('direction 映射为 type', () => {
    const wrapper = mount(UcDivider, { props: { direction: 'vertical' } })
    expect(wrapper.find('.ant-divider').classes()).toContain('ant-divider-vertical')
  })

  it('dashed 映射为类名', () => {
    const wrapper = mount(UcDivider, { props: { dashed: true } })
    expect(wrapper.find('.ant-divider').classes()).toContain('ant-divider-dashed')
  })
})
