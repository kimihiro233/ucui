import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcAvatar 统一契约：所有适配器实现都必须满足这些行为
export function avatarContract(name, UcAvatar) {
  describe(`UcAvatar 契约 [${name}]`, () => {
    it('渲染头像容器', () => {
      const wrapper = mount(UcAvatar)
      expect(wrapper.find('.el-avatar, .ant-avatar').exists()).toBe(true)
    })

    it('默认插槽渲染文字头像', () => {
      const wrapper = mount(UcAvatar, { slots: { default: 'K' } })
      expect(wrapper.text()).toContain('K')
    })

    it('src 渲染图片', () => {
      const wrapper = mount(UcAvatar, {
        props: { src: 'https://example.com/a.png' },
      })
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/a.png')
    })

    it('alt 透传到图片', () => {
      const wrapper = mount(UcAvatar, {
        props: { src: 'https://example.com/a.png', alt: '头像' },
      })
      expect(wrapper.find('img').attributes('alt')).toBe('头像')
    })

    it('shape=square 渲染方形类名', () => {
      const wrapper = mount(UcAvatar, { props: { shape: 'square' } })
      expect(wrapper.find('.el-avatar, .ant-avatar').html()).toContain('square')
    })
  })
}
