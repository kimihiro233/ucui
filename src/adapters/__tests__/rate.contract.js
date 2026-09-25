import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcRate 统一契约：所有适配器实现都必须满足这些行为
export function rateContract(name, UcRate) {
  // element 星星是 span.el-rate__item；antd 点击 handler 在内部 div[role="radio"] 上
  const findStars = (wrapper) => {
    const elItems = wrapper.findAll('.el-rate__item')
    return elItems.length ? elItems : wrapper.findAll('.ant-rate [role="radio"]')
  }

  describe(`UcRate 契约 [${name}]`, () => {
    it('渲染评分组件', () => {
      const wrapper = mount(UcRate)
      expect(wrapper.find('.el-rate, .ant-rate').exists()).toBe(true)
    })

    it('渲染 max 颗星星', () => {
      const wrapper = mount(UcRate, { props: { max: 5 } })
      expect(findStars(wrapper).length).toBe(5)
    })

    it('点击第 3 颗星触发 update:modelValue(3)', async () => {
      const wrapper = mount(UcRate, { props: { modelValue: 0 } })
      await findStars(wrapper)[2].trigger('click')
      await nextTick()
      // element 在 modelValue=0 时 setup 初始会先 emit 0，取最后一次才是点击结果
      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([3])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcRate },
        data: () => ({ val: 0 }),
        template: '<UcRate v-model="val" />',
      })
      await findStars(wrapper)[3].trigger('click')
      await nextTick()
      expect(wrapper.vm.val).toBe(4)
    })

    it('change 事件参数为数值', async () => {
      const wrapper = mount(UcRate, { props: { modelValue: 0 } })
      await findStars(wrapper)[1].trigger('click')
      await nextTick()
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual([2])
    })

    it('disabled 时点击不改变值', async () => {
      const wrapper = mount(UcRate, { props: { disabled: true, modelValue: 0 } })
      await findStars(wrapper)[2].trigger('click')
      await nextTick()
      // element 在 modelValue=0 时初始会 emit 0；antd disabled 下不 emit
      const emits = wrapper.emitted('update:modelValue')
      if (emits) {
        // 断言最后一次 emit 仍为 0（未产生新值）
        expect(emits.at(-1)[0]).toBe(0)
      }
    })
  })
}
