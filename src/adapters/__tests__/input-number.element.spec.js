import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcInputNumber from '../element/input-number'
import { inputNumberContract } from './input-number.contract'

inputNumberContract('element-plus', UcInputNumber)

describe('UcInputNumber element-plus 专属映射', () => {
  it('点击增加按钮更新值并 emit', async () => {
    const wrapper = mount(UcInputNumber, {
      props: { modelValue: 1, min: 0, max: 10, step: 1 },
    })
    const increase = wrapper.find('.el-input-number__increase')
    expect(increase.exists()).toBe(true)
    // element 增减按钮监听 mousedown（支持长按连增），不是 click
    await increase.trigger('mousedown')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([2])
  })
})
