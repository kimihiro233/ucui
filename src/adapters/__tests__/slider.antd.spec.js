import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSlider from '../antd/slider'
import { sliderContract } from './slider.contract'

sliderContract('ant-design-vue', UcSlider)

describe('UcSlider ant-design-vue 专属映射', () => {
  it('渲染 ant-slider', () => {
    const wrapper = mount(UcSlider, { props: { modelValue: 30 } })
    expect(wrapper.find('.ant-slider').exists()).toBe(true)
  })

  it('modelValue 映射为 value（填充百分比）', () => {
    const wrapper = mount(UcSlider, { props: { modelValue: 30 } })
    expect(wrapper.html()).toContain('30%')
  })
})
