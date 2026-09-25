import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLink from '../antd/link'
import { linkContract } from './link.contract'

linkContract('ant-design-vue', UcLink)

describe('UcLink ant-design-vue 专属映射', () => {
  it('渲染 Typography Link（ant-typography 类）', () => {
    const wrapper = mount(UcLink, {
      props: { href: '#x' },
      slots: { default: '文字' },
    })
    expect(wrapper.find('a.ant-typography').exists()).toBe(true)
  })

  it('success/warning/danger 映射为 ant-typography-{type} 类', () => {
    const wrapper = mount(UcLink, {
      props: { type: 'success' },
      slots: { default: '文字' },
    })
    expect(wrapper.find('a').classes()).toContain('ant-typography-success')
  })

  it('default/primary 不带 type 修饰类（保持链接默认蓝）', () => {
    const wrapper = mount(UcLink, {
      props: { type: 'primary' },
      slots: { default: '文字' },
    })
    const classes = wrapper.find('a').classes()
    expect(
      [
        'ant-typography-success',
        'ant-typography-warning',
        'ant-typography-danger',
        'ant-typography-disabled',
        'ant-typography-underline',
      ].some((c) => classes.includes(c)),
    ).toBe(false)
  })

  it('underline=never 不渲染 <u> 包裹', () => {
    const wrapper = mount(UcLink, {
      props: { underline: 'never' },
      slots: { default: '文字' },
    })
    expect(wrapper.find('a u').exists()).toBe(false)
  })
})
