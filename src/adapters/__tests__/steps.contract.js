import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcSteps 统一契约：所有适配器实现都必须满足这些行为
export function stepsContract(name, UcSteps) {
  const items = [
    { title: '第一步', description: '填写信息' },
    { title: '第二步', description: '确认订单' },
    { title: '第三步', description: '完成' },
  ]

  describe(`UcSteps 契约 [${name}]`, () => {
    it('渲染步骤条容器', () => {
      const wrapper = mount(UcSteps, { props: { items } })
      expect(wrapper.find('.el-steps, .ant-steps').exists()).toBe(true)
    })

    it('渲染所有步骤标题', () => {
      const wrapper = mount(UcSteps, { props: { items } })
      expect(wrapper.text()).toContain('第一步')
      expect(wrapper.text()).toContain('第二步')
      expect(wrapper.text()).toContain('第三步')
    })

    it('渲染步骤描述', () => {
      const wrapper = mount(UcSteps, { props: { items } })
      expect(wrapper.text()).toContain('填写信息')
    })

    it('modelValue 指向当前步骤（进行中状态）', async () => {
      const wrapper = mount(UcSteps, {
        props: { modelValue: 1, items },
      })
      // element 状态在 onMounted 的 immediate watch 中计算，重渲染需等微任务
      await nextTick()
      // element 状态类挂在 el-step__head 上（is-process）；antd 在 li 上（ant-steps-item-active）
      expect(wrapper.find('.el-step__head.is-process, .ant-steps-item-active').exists()).toBe(true)
    })
  })
}
