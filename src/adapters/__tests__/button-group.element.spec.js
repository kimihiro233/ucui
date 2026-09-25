import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcButtonGroup from '../element/button-group'
import UcButton from '../element/button'
import { buttonGroupContract } from './button-group.contract'

buttonGroupContract('element-plus', UcButtonGroup, UcButton)

describe('UcButtonGroup element-plus 专属映射', () => {
  it('size/direction 传给 ElButtonGroup，type 默认不传', () => {
    const wrapper = mount(UcButtonGroup, {
      props: { size: 'small', direction: 'vertical' },
      slots: {
        default: () => [h(UcButton, null, { default: () => 'A' })],
      },
    })
    const inner = wrapper.findComponent({ name: 'ElButtonGroup' })
    expect(inner.props('size')).toBe('small')
    expect(inner.props('direction')).toBe('vertical')
    // ElButtonGroup type 取自 buttonProps.type，声明默认值为 ''（VTU 解析后即 ''）
    expect(inner.props('type')).toBe('')
  })

  it('vertical 方向容器带 el-button-group--vertical', () => {
    const wrapper = mount(UcButtonGroup, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [h(UcButton, null, { default: () => 'A' })],
      },
    })
    expect(wrapper.find('.el-button-group').classes()).toContain(
      'el-button-group--vertical',
    )
  })

  it('type=primary 同时传给 ElButtonGroup（provide 上下文）', () => {
    const wrapper = mount(UcButtonGroup, {
      props: { type: 'primary' },
      slots: {
        default: () => [h(UcButton, null, { default: () => 'A' })],
      },
    })
    expect(wrapper.findComponent({ name: 'ElButtonGroup' }).props('type')).toBe('primary')
  })
})
