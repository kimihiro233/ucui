import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSlider from '../element/slider'
import { sliderContract } from './slider.contract'

sliderContract('element-plus', UcSlider)

describe('UcSlider element-plus 专属映射', () => {
  it('渲染 el-slider', () => {
    const wrapper = mount(UcSlider, { props: { modelValue: 30 } })
    expect(wrapper.find('.el-slider').exists()).toBe(true)
  })

  it('modelValue 映射为进度填充宽度', () => {
    const wrapper = mount(UcSlider, { props: { modelValue: 30 } })
    // element 用内联百分比表示填充位置
    expect(wrapper.html()).toContain('30%')
  })
})
