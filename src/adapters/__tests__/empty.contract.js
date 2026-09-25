import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcEmpty 统一契约：所有适配器实现都必须满足这些行为
export function emptyContract(name, UcEmpty) {
  describe(`UcEmpty 契约 [${name}]`, () => {
    it('渲染空状态容器', () => {
      const wrapper = mount(UcEmpty)
      expect(wrapper.find('.el-empty, .ant-empty').exists()).toBe(true)
    })

    it('渲染默认占位图', () => {
      const wrapper = mount(UcEmpty)
      // 两端默认都是 svg 插画
      expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('渲染 description', () => {
      const wrapper = mount(UcEmpty, { props: { description: '暂无数据' } })
      expect(wrapper.text()).toContain('暂无数据')
    })

    it('自定义 image URL 渲染为 img', () => {
      const wrapper = mount(UcEmpty, { props: { image: 'https://example.com/e.png' } })
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/e.png')
    })

    it('imageSize 控制图片宽度', () => {
      const wrapper = mount(UcEmpty, { props: { imageSize: 80 } })
      // element: 内联 width:80px；antd: imageStyle width:80px
      expect(wrapper.html()).toContain('80px')
    })
  })
}
