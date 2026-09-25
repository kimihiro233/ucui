import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcWatermark 统一契约：
// content/image/width/height/rotate/zIndex/gap/offset/font + 默认插槽包裹内容
// 双端都在 onMounted 时以原生 DOM 方式往容器内 append 带 background-image 的水印层
export function watermarkContract(libName, UcWatermark) {
  const innerName = libName === 'element-plus' ? 'ElWatermark' : 'AWatermark'
  const findInner = (wrapper) => wrapper.findComponent({ name: innerName })
  // happy-dom 未实现 canvas 2d context（getContext 返回 null），
  // 双端底层都会跳过水印层绘制；该用例只在真实浏览器/支持 canvas 的环境运行
  const supportsCanvas = !!document.createElement('canvas').getContext('2d')

  const mountWm = (props = {}) =>
    mount(UcWatermark, {
      props,
      slots: { default: '<p class="wm-slot">正文内容</p>' },
    })

  describe(`UcWatermark 契约 [${libName}]`, () => {
    it('默认插槽内容正常渲染', () => {
      const wrapper = mountWm()
      expect(wrapper.find('.wm-slot').exists()).toBe(true)
      expect(wrapper.find('.wm-slot').text()).toBe('正文内容')
    })

    it('默认 content 为 UniUI（不透传底层默认文案）', () => {
      const wrapper = mountWm()
      expect(findInner(wrapper).props('content')).toBe('UniUI')
    })

    it.skipIf(!supportsCanvas)('挂载后生成带 background-image 的水印层', async () => {
      const wrapper = mountWm({ content: '保密' })
      await flushPromises()
      const layer = Array.from(wrapper.element.children).find(
        (el) => el.tagName === 'DIV' && el.style.backgroundImage.includes('url'),
      )
      expect(layer).toBeTruthy()
      // 水印层绝对定位、pointer-events 受控、zIndex 生效
      expect(layer.style.position).toBe('absolute')
      expect(layer.style.zIndex).toBe('9')
    })

    it('content 透传到底层', () => {
      const wrapper = mountWm({ content: '机密文件' })
      expect(findInner(wrapper).props('content')).toBe('机密文件')
    })

    it('content 支持多行数组', () => {
      const wrapper = mountWm({ content: ['第一行', '第二行'] })
      expect(findInner(wrapper).props('content')).toEqual(['第一行', '第二行'])
    })

    it('rotate/zIndex/width/height 透传', () => {
      const wrapper = mountWm({ rotate: 30, zIndex: 99, width: 120, height: 80 })
      const inner = findInner(wrapper)
      expect(inner.props('rotate')).toBe(30)
      expect(inner.props('zIndex')).toBe(99)
      expect(inner.props('width')).toBe(120)
      expect(inner.props('height')).toBe(80)
    })

    it('gap/offset 透传', () => {
      const wrapper = mountWm({ gap: [80, 80], offset: [20, 40] })
      const inner = findInner(wrapper)
      expect(inner.props('gap')).toEqual([80, 80])
      expect(inner.props('offset')).toEqual([20, 40])
    })

    it('image 与 font 透传；未传 image 时底层为 undefined', () => {
      const font = { color: 'red', fontSize: 14 }
      const wrapper = mountWm({ image: 'https://example.com/wm.png', font })
      const inner = findInner(wrapper)
      expect(inner.props('image')).toBe('https://example.com/wm.png')
      expect(inner.props('font')).toEqual(font)

      const wrapper2 = mountWm()
      expect(findInner(wrapper2).props('image')).toBeUndefined()
    })

    it('class 逃生舱落到容器', () => {
      const wrapper = mountWm({ class: 'my-watermark' })
      expect(wrapper.html()).toContain('my-watermark')
    })
  })
}
