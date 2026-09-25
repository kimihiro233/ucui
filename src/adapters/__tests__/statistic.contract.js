import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcStatistic 统一契约：所有适配器实现都必须满足这些行为
export function statisticContract(name, UcStatistic) {
  const mountStatistic = (props = {}) => mount(UcStatistic, { props })

  describe(`UcStatistic 契约 [${name}]`, () => {
    it('渲染统计容器', () => {
      const wrapper = mountStatistic({ value: 42 })
      expect(wrapper.find('.el-statistic, .ant-statistic').exists()).toBe(true)
    })

    it('渲染 title', () => {
      const wrapper = mountStatistic({ title: '活跃用户', value: 42 })
      expect(wrapper.text()).toContain('活跃用户')
    })

    it('渲染数值', () => {
      const wrapper = mountStatistic({ value: 42 })
      expect(wrapper.text()).toContain('42')
    })

    it('precision 控制小数位', () => {
      const wrapper = mountStatistic({ value: 3.14159, precision: 2 })
      expect(wrapper.text()).toContain('3.14')
    })

    it('渲染 prefix 与 suffix', () => {
      const wrapper = mountStatistic({ value: 100, prefix: '¥', suffix: '元' })
      expect(wrapper.text()).toContain('¥')
      expect(wrapper.text()).toContain('元')
    })
  })
}
