import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcAvatarGroup from '../element/avatar-group'
import UcAvatar from '../element/avatar'
import { avatarGroupContract } from './avatar-group.contract'

// 上游 bug：ElAvatarGroup 的 avatarGroupProps 是裸对象（漏包 buildProps），
// Vue 原生校验只认 validator: isNumber，传 large/small/default 字符串必告警，
// 实际渲染与 provide 均正常。这里局部屏蔽该类型告警。
beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => {
  vi.restoreAllMocks()
})

avatarGroupContract('element-plus', UcAvatarGroup, UcAvatar)

describe('UcAvatarGroup element-plus 专属映射', () => {
  const oneAvatar = () => [h(UcAvatar, null, { default: () => 'A' })]
  const fourAvatars = () =>
    Array.from({ length: 4 }, (_, i) => h(UcAvatar, null, { default: () => `U${i + 1}` }))

  it('未传 max 时不开启 collapseAvatars', () => {
    const wrapper = mount(UcAvatarGroup, { slots: { default: oneAvatar } })
    const inner = wrapper.findComponent({ name: 'ElAvatarGroup' })
    expect(inner.props('collapseAvatars')).toBe(false)
    expect(inner.props('maxCollapseAvatars')).toBe(1)
  })

  it('max 映射为 collapseAvatars=true + maxCollapseAvatars', () => {
    const wrapper = mount(UcAvatarGroup, {
      props: { max: 3 },
      slots: { default: fourAvatars },
    })
    const inner = wrapper.findComponent({ name: 'ElAvatarGroup' })
    expect(inner.props('collapseAvatars')).toBe(true)
    expect(inner.props('maxCollapseAvatars')).toBe(3)
  })

  it('placement 直传 ElAvatarGroup', () => {
    const wrapper = mount(UcAvatarGroup, {
      props: { placement: 'bottom' },
      slots: { default: oneAvatar },
    })
    expect(wrapper.findComponent({ name: 'ElAvatarGroup' }).props('placement')).toBe(
      'bottom',
    )
  })

  it('collapseAvatarsTooltip 单边能力经 attrs 逃生舱透传', () => {
    const wrapper = mount(UcAvatarGroup, {
      attrs: { collapseAvatarsTooltip: false },
      slots: { default: oneAvatar },
    })
    expect(
      wrapper.findComponent({ name: 'ElAvatarGroup' }).props('collapseAvatarsTooltip'),
    ).toBe(false)
  })
})
