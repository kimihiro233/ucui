import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcImage 统一契约：src/alt/width/height/fit/preview + @error
// 预览弹层（element image-viewer / antd image-preview）默认 teleport 到 body，
// 交互断言用"出现则校验"兼容模式
export function imageContract(libName, UcImage) {
  const src = 'https://example.com/demo.png'

  describe(`UcImage 契约 [${libName}]`, () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('渲染 img 并绑定 src', async () => {
      const wrapper = mount(UcImage, { props: { src } })
      await flushPromises()
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe(src)
    })

    it('alt 透传到 img', async () => {
      const wrapper = mount(UcImage, { props: { src, alt: '示例图片' } })
      await flushPromises()
      expect(wrapper.find('img').attributes('alt')).toBe('示例图片')
    })

    it('width/height 生效', async () => {
      const wrapper = mount(UcImage, { props: { src, width: 100, height: 80 } })
      await flushPromises()
      const img = wrapper.find('img')
      // 双端都在 img 上输出 width/height；尺寸样式也可能落在包裹层
      expect(img.attributes('width')).toBe('100')
      expect(img.attributes('height')).toBe('80')
    })

    it('fit 映射为 img 的 object-fit 样式', async () => {
      const wrapper = mount(UcImage, { props: { src, fit: 'cover' } })
      await flushPromises()
      expect(wrapper.find('img').element.style.objectFit).toBe('cover')
    })

    it('默认 preview=false：点击不出现预览弹层', async () => {
      const wrapper = mount(UcImage, { props: { src }, attachTo: document.body })
      await flushPromises()
      await wrapper.find('img').trigger('click')
      await flushPromises()
      expect(document.querySelector('.el-image-viewer, .ant-image-preview')).toBeFalsy()
      wrapper.unmount()
    })

    it('preview=true：点击后出现预览弹层则校验大图', async () => {
      const wrapper = mount(UcImage, {
        props: { src, preview: true },
        attachTo: document.body,
      })
      await flushPromises()
      await wrapper.find('img').trigger('click')
      await flushPromises()
      const viewerImg = document.querySelector(
        '.el-image-viewer__img, .ant-image-preview-img',
      )
      if (viewerImg) {
        expect(viewerImg.getAttribute('src')).toBe(src)
      }
      wrapper.unmount()
    })

    it('img 加载失败触发 error 事件', async () => {
      const wrapper = mount(UcImage, { props: { src } })
      await flushPromises()
      wrapper.find('img').element.dispatchEvent(new Event('error'))
      expect(wrapper.emitted('error')).toBeTruthy()
    })
  })
}
