import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import UcButton from '../antd/button'
import { buttonContract } from './button.contract'

// 统一契约：antd 实现必须满足
buttonContract('antd', UcButton)

// antd 专属映射验证
describe('UcButton antd 映射', () => {
  it('type=primary 映射为 ant-btn-primary', () => {
    const wrapper = mount(UcButton, { props: { type: 'primary' } })
    expect(wrapper.find('button').classes()).toContain('ant-btn-primary')
  })

  it('统一 type=danger 映射为 antd 的 danger boolean', () => {
    const wrapper = mount(UcButton, { props: { type: 'danger' } })
    expect(wrapper.find('button').classes()).toContain('ant-btn-dangerous')
  })

  it('text 覆盖为 type=text', () => {
    const wrapper = mount(UcButton, { props: { text: true } })
    expect(wrapper.find('button').classes()).toContain('ant-btn-text')
  })

  it('link 覆盖为 type=link', () => {
    const wrapper = mount(UcButton, { props: { link: true } })
    expect(wrapper.find('button').classes()).toContain('ant-btn-link')
  })

  it('link 优先于 text（antd type 单值取舍）', () => {
    const wrapper = mount(UcButton, { props: { text: true, link: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('ant-btn-link')
    expect(classes).not.toContain('ant-btn-text')
  })

  it('text + danger 组合映射', () => {
    const wrapper = mount(UcButton, { props: { type: 'danger', text: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('ant-btn-text')
    expect(classes).toContain('ant-btn-dangerous')
  })

  it('link + danger 组合映射', () => {
    const wrapper = mount(UcButton, { props: { type: 'danger', link: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('ant-btn-link')
    expect(classes).toContain('ant-btn-dangerous')
  })
})
