import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcButtonGroup from '../antd/button-group'
import UcButton from '../antd/button'
import { buttonGroupContract } from './button-group.contract'

buttonGroupContract('ant-design-vue', UcButtonGroup, UcButton)

describe('UcButtonGroup ant-design-vue 专属映射', () => {
  it('size=default 映射为 middle', () => {
    const wrapper = mount(UcButtonGroup, {
      slots: {
        default: () => [h(UcButton, null, { default: () => 'A' })],
      },
    })
    expect(wrapper.findComponent({ name: 'AButtonGroup' }).props('size')).toBe('middle')
  })

  it('size=large 映射 large 且容器带 ant-btn-group-lg', () => {
    const wrapper = mount(UcButtonGroup, {
      props: { size: 'large' },
      slots: {
        default: () => [h(UcButton, null, { default: () => 'A' })],
      },
    })
    const inner = wrapper.findComponent({ name: 'AButtonGroup' })
    expect(inner.props('size')).toBe('large')
    expect(wrapper.find('.ant-btn-group').classes()).toContain('ant-btn-group-lg')
  })

  it('direction=vertical 不透传（antd 无垂直按钮组能力）', () => {
    const wrapper = mount(UcButtonGroup, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [h(UcButton, null, { default: () => 'A' })],
      },
    })
    expect(wrapper.find('.ant-btn-group').classes()).not.toContain(
      'ant-btn-group-vertical',
    )
  })
})
