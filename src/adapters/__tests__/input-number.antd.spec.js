import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcInputNumber from '../antd/input-number'
import { inputNumberContract } from './input-number.contract'

inputNumberContract('ant-design-vue', UcInputNumber)

describe('UcInputNumber ant-design-vue 专属映射', () => {
  it('modelValue 映射为 value', () => {
    const wrapper = mount(UcInputNumber, { props: { modelValue: 7 } })
    expect(wrapper.findComponent({ name: 'AInputNumber' }).props('value')).toBe(7)
  })

  it('点击上箭头更新值并归一化 emit', async () => {
    const wrapper = mount(UcInputNumber, {
      props: { modelValue: 1, min: 0, max: 10 },
    })
    const up = wrapper.find('.ant-input-number-handler-up')
    expect(up.exists()).toBe(true)
    await up.trigger('mousedown')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([2])
  })
})
