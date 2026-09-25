import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSteps from '../antd/steps'
import { stepsContract } from './steps.contract'

stepsContract('ant-design-vue', UcSteps)

describe('UcSteps ant-design-vue 专属映射', () => {
  const items = [
    { title: '一' },
    { title: '二' },
    { title: '三' },
  ]

  it('渲染 ant-steps 且 items 数量一致', () => {
    const wrapper = mount(UcSteps, { props: { items } })
    expect(wrapper.find('.ant-steps').exists()).toBe(true)
    expect(wrapper.findAll('.ant-steps-item').length).toBe(3)
  })

  it('modelValue 映射为 current（active 状态）', () => {
    const wrapper = mount(UcSteps, { props: { modelValue: 1, items } })
    expect(wrapper.findAll('.ant-steps-item')[1].classes()).toContain('ant-steps-item-active')
  })
})
