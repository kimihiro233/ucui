import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import UcButton from '../element/button'
import { buttonContract } from './button.contract'

// 统一契约：element 实现必须满足
buttonContract('element', UcButton)

// element 专属映射验证
describe('UcButton element 映射', () => {
  it('type=primary 映射为 el-button--primary', () => {
    const wrapper = mount(UcButton, { props: { type: 'primary' } })
    expect(wrapper.find('button').classes()).toContain('el-button--primary')
  })

  it('size=small 映射为 el-button--small', () => {
    const wrapper = mount(UcButton, { props: { size: 'small' } })
    expect(wrapper.find('button').classes()).toContain('el-button--small')
  })

  it('text 映射为 is-text（而非废弃的 type=text）', () => {
    const wrapper = mount(UcButton, { props: { text: true } })
    expect(wrapper.find('button').classes()).toContain('is-text')
  })

  it('link 映射为 is-link', () => {
    const wrapper = mount(UcButton, { props: { link: true } })
    expect(wrapper.find('button').classes()).toContain('is-link')
  })

  it('text + danger 组合映射', () => {
    const wrapper = mount(UcButton, { props: { type: 'danger', text: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('is-text')
    expect(classes).toContain('el-button--danger')
  })

  it('link + danger 组合映射', () => {
    const wrapper = mount(UcButton, { props: { type: 'danger', link: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('is-link')
    expect(classes).toContain('el-button--danger')
  })
})
