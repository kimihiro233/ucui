import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAvatar from '../antd/avatar'
import { avatarContract } from './avatar.contract'

avatarContract('ant-design-vue', UcAvatar)

describe('UcAvatar ant-design-vue 专属映射', () => {
  it('渲染 ant-avatar', () => {
    const wrapper = mount(UcAvatar)
    expect(wrapper.find('.ant-avatar').exists()).toBe(true)
  })

  it('size 数字映射为像素', () => {
    const wrapper = mount(UcAvatar, { props: { size: 50 } })
    expect(wrapper.find('.ant-avatar').attributes('style')).toContain('50px')
  })

  it('shape=square 映射为类名', () => {
    const wrapper = mount(UcAvatar, { props: { shape: 'square' } })
    expect(wrapper.find('.ant-avatar').classes()).toContain('ant-avatar-square')
  })
})
