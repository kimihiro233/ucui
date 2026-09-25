import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import UcSteps from '../element/steps'
import { stepsContract } from './steps.contract'

stepsContract('element-plus', UcSteps)

describe('UcSteps element-plus 专属映射', () => {
  const items = [
    { title: '一' },
    { title: '二' },
    { title: '三' },
  ]

  it('渲染 el-steps 与 ElStep 子节点', () => {
    const wrapper = mount(UcSteps, { props: { items } })
    expect(wrapper.find('.el-steps').exists()).toBe(true)
    expect(wrapper.findAll('.el-step').length).toBe(3)
  })

  it('modelValue 映射为 active', async () => {
    const wrapper = mount(UcSteps, { props: { modelValue: 2, items } })
    await nextTick()
    const head = wrapper.findAll('.el-step')[2].find('.el-step__head')
    expect(head.classes()).toContain('is-process')
  })

  it('已完成步骤带 finish 状态', async () => {
    const wrapper = mount(UcSteps, { props: { modelValue: 1, items } })
    await nextTick()
    const head = wrapper.findAll('.el-step')[0].find('.el-step__head')
    expect(head.classes()).toContain('is-finish')
  })
})
