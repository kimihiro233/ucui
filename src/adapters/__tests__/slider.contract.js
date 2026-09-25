import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcSlider 统一契约：所有适配器实现都必须满足这些行为
// 注：滑块交互依赖 getBoundingClientRect（拖拽）和真实键盘行为，happy-dom 下不可靠，
// 契约只验证渲染和 attrs 透传，值映射由各自专属 spec 覆盖
export function sliderContract(name, UcSlider) {
  describe(`UcSlider 契约 [${name}]`, () => {
    it('渲染滑块', () => {
      const wrapper = mount(UcSlider)
      expect(wrapper.find('.el-slider, .ant-slider').exists()).toBe(true)
    })

    it('透传 class 到根元素', () => {
      const wrapper = mount(UcSlider, {
        props: { modelValue: 30 },
        attrs: { class: 'my-slider' },
      })
      // antd 的 vc-slider 根元素只消费 class/style（rc-slider 实现限制），
      // 统一用 class 验证透传，两端均支持
      expect(wrapper.find('.el-slider, .ant-slider').classes()).toContain('my-slider')
    })

    it('disabled 时渲染禁用态', () => {
      const wrapper = mount(UcSlider, { props: { disabled: true } })
      expect(wrapper.find('.is-disabled, .ant-slider-disabled').exists()).toBe(true)
    })
  })
}
