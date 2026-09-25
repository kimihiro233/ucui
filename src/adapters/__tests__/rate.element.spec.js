import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRate from '../element/rate'
import { rateContract } from './rate.contract'

rateContract('element-plus', UcRate)

describe('UcRate element-plus 专属映射', () => {
  it('modelValue=3 时前 3 项 is-active', () => {
    const wrapper = mount(UcRate, { props: { modelValue: 3 } })
    const items = wrapper.findAll('.el-rate__item')
    expect(items[2].find('.el-rate__icon').classes()).toContain('is-active')
    expect(items[3].find('.el-rate__icon').classes()).not.toContain('is-active')
  })

  it('max 映射为星星数量', () => {
    const wrapper = mount(UcRate, { props: { max: 8 } })
    expect(wrapper.findAll('.el-rate__item').length).toBe(8)
  })
})
