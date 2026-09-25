import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAvatar from '../element/avatar'
import { avatarContract } from './avatar.contract'

avatarContract('element-plus', UcAvatar)

describe('UcAvatar element-plus 专属映射', () => {
  it('渲染 el-avatar', () => {
    const wrapper = mount(UcAvatar)
    expect(wrapper.find('.el-avatar').exists()).toBe(true)
  })

  it('size 数字映射为像素', () => {
    const wrapper = mount(UcAvatar, { props: { size: 64 } })
    expect(wrapper.find('.el-avatar').attributes('style')).toContain('64px')
  })

  it('shape=square 映射为类名', () => {
    const wrapper = mount(UcAvatar, { props: { shape: 'square' } })
    expect(wrapper.find('.el-avatar').classes()).toContain('el-avatar--square')
  })
})
