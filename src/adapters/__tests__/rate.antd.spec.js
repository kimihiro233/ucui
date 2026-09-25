import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRate from '../antd/rate'
import { rateContract } from './rate.contract'

rateContract('ant-design-vue', UcRate)

describe('UcRate ant-design-vue 专属映射', () => {
  it('modelValue=3 时前 3 颗 ant-rate-star-full', () => {
    const wrapper = mount(UcRate, { props: { modelValue: 3 } })
    const stars = wrapper.findAll('.ant-rate li')
    expect(stars[2].classes()).toContain('ant-rate-star-full')
    expect(stars[3].classes()).toContain('ant-rate-star-zero')
  })

  it('max 映射为 count', () => {
    const wrapper = mount(UcRate, { props: { max: 8 } })
    expect(wrapper.findAll('.ant-rate li').length).toBe(8)
  })
})
