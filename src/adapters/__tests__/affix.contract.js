import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

// UcAffix 统一契约：
// offset(number，默认 0)/position(top|bottom，默认 top)/target(CSS 选择器) + @change(fixed)
// element：offset/position/target 直映；antd：offsetTop|offsetBottom，target 是函数
export function affixContract(libName, UcAffix) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElAffix' : 'AAffix'

  const mountAffix = (props = {}, slots = {}) =>
    mount(UcAffix, {
      props,
      slots: { default: '<div class="affix-content">固定内容</div>', ...slots },
    })

  afterEach(() => {
    document.querySelectorAll('.affix-target').forEach((n) => n.remove())
  })

  describe(`UcAffix 契约 [${libName}]`, () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mountAffix()
      expect(wrapper.find('.affix-content').text()).toContain('固定内容')
    })

    it('offset + position=top（默认）映射到底层', () => {
      const wrapper = mountAffix({ offset: 80 })
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        expect(inner.props('offset')).toBe(80)
        expect(inner.props('position')).toBe('top')
      } else {
        expect(inner.props('offsetTop')).toBe(80)
        expect(inner.props('offsetBottom')).toBeUndefined()
      }
    })

    it('position=bottom 时 antd 走 offsetBottom / element position=bottom', () => {
      const wrapper = mountAffix({ position: 'bottom', offset: 40 })
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        expect(inner.props('position')).toBe('bottom')
        expect(inner.props('offset')).toBe(40)
      } else {
        expect(inner.props('offsetBottom')).toBe(40)
        expect(inner.props('offsetTop')).toBeUndefined()
      }
    })

    it('target 字符串选择器归一化：element 直映，antd 转为函数', () => {
      const box = document.createElement('div')
      box.className = 'affix-target'
      document.body.appendChild(box)

      const wrapper = mountAffix({ target: '.affix-target' })
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        expect(inner.props('target')).toBe('.affix-target')
      } else {
        const targetFn = inner.props('target')
        expect(typeof targetFn).toBe('function')
        expect(targetFn()).toBe(box)
      }
    })

    it('固定状态变化归一化为 change(fixed)', () => {
      const wrapper = mountAffix()
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        // ElAffix 声明了 emits，监听器不在 props 上
        inner.vm.$emit('change', true)
      } else {
        inner.props('onChange')(true)
      }
      expect(wrapper.emitted('change')[0]).toEqual([true])
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountAffix({ class: 'my-affix' })
      expect(wrapper.html()).toContain('my-affix')
    })
  })
}
