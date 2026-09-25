import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcAvatarGroup from '../antd/avatar-group'
import UcAvatar from '../antd/avatar'
import { avatarGroupContract } from './avatar-group.contract'

avatarGroupContract('ant-design-vue', UcAvatarGroup, UcAvatar)

describe('UcAvatarGroup ant-design-vue 专属映射', () => {
  const oneAvatar = () => [h(UcAvatar, null, { default: () => 'A' })]

  it('max 映射为 maxCount，placement 映射为 maxPopoverPlacement', () => {
    const wrapper = mount(UcAvatarGroup, {
      props: { max: 2, placement: 'bottom' },
      slots: {
        default: () =>
          Array.from({ length: 4 }, (_, i) =>
            h(UcAvatar, null, { default: () => `U${i + 1}` }),
          ),
      },
    })
    const inner = wrapper.findComponent({ name: 'AAvatarGroup' })
    expect(inner.props('maxCount')).toBe(2)
    expect(inner.props('maxPopoverPlacement')).toBe('bottom')
  })

  it('默认 size=default / shape=circle 哨兵值', () => {
    const wrapper = mount(UcAvatarGroup, { slots: { default: oneAvatar } })
    const inner = wrapper.findComponent({ name: 'AAvatarGroup' })
    expect(inner.props('size')).toBe('default')
    expect(inner.props('shape')).toBe('circle')
  })

  it('折叠指示头像文本为 +N 且形状跟随 group', () => {
    const wrapper = mount(UcAvatarGroup, {
      props: { max: 2, shape: 'square' },
      slots: {
        default: () =>
          Array.from({ length: 5 }, (_, i) =>
            h(UcAvatar, null, { default: () => `U${i + 1}` }),
          ),
      },
    })
    const avatars = wrapper.findAll('.ant-avatar')
    expect(avatars[avatars.length - 1].text()).toBe('+3')
    expect(avatars[avatars.length - 1].classes()).toContain('ant-avatar-square')
  })
})
