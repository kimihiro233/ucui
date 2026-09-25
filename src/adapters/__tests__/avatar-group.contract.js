import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

// UcAvatarGroup 统一契约
// props: size(档位|px) / shape(circle|square) / max(折叠阈值) / placement
// group 的 size/shape 必须穿透 UcAvatar 包装；超出 max 出现 "+N" 折叠头像
export function avatarGroupContract(libName, UcAvatarGroup, UcAvatar) {
  const isElement = libName === 'element-plus'
  const groupSel = isElement ? '.el-avatar-group' : '.ant-avatar-group'
  const avatarSel = isElement ? '.el-avatar' : '.ant-avatar'
  const innerName = isElement ? 'ElAvatar' : 'AAvatar'

  const mountGroup = (props = {}, n = 3) =>
    mount(UcAvatarGroup, {
      props,
      slots: {
        default: () =>
          Array.from({ length: n }, (_, i) =>
            h(UcAvatar, null, { default: () => `U${i + 1}` }),
          ),
      },
    })

  describe(`UcAvatarGroup 契约 [${libName}]`, () => {
    it('渲染头像组容器', () => {
      const wrapper = mountGroup()
      expect(wrapper.find(groupSel).exists()).toBe(true)
    })

    it('默认子头像全部渲染', () => {
      const wrapper = mountGroup({}, 2)
      expect(wrapper.findAll(avatarSel)).toHaveLength(2)
    })

    it('size 穿透到每个底层头像', () => {
      const wrapper = mountGroup({ size: 'large' }, 2)
      const avatars = wrapper.findAllComponents({ name: innerName })
      // 折叠指示头像也算底层头像之一，断言至少子头像都拿到 large
      expect(avatars.length).toBeGreaterThanOrEqual(2)
      avatars.forEach((a) => expect(a.props('size')).toBe('large'))
    })

    it('shape=square 穿透到每个底层头像', () => {
      const wrapper = mountGroup({ shape: 'square' }, 2)
      wrapper.findAllComponents({ name: innerName }).forEach((a) => {
        expect(a.props('shape')).toBe('square')
      })
    })

    it('数字 px 尺寸穿透到底层头像', () => {
      const wrapper = mountGroup({ size: 48 }, 2)
      wrapper.findAllComponents({ name: innerName }).forEach((a) => {
        expect(a.props('size')).toBe(48)
      })
    })

    it('max 折叠：超出部分收进 "+N" 指示头像', () => {
      const wrapper = mountGroup({ max: 2 }, 4)
      const avatars = wrapper.findAll(avatarSel)
      // 2 个可见 + 1 个 "+2" 指示
      expect(avatars).toHaveLength(3)
      expect(avatars[avatars.length - 1].text().replace(/\s/g, '')).toBe('+2')
      expect(avatars[0].text()).toBe('U1')
      expect(avatars[1].text()).toBe('U2')
    })

    it('class 逃生舱落到容器', () => {
      const wrapper = mount(UcAvatarGroup, {
        attrs: { class: 'my-avatar-group' },
        slots: {
          default: () => [h(UcAvatar, null, { default: () => 'A' })],
        },
      })
      expect(wrapper.html()).toContain('my-avatar-group')
    })
  })
}
