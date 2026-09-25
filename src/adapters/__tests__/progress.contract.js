import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcProgress 统一契约：所有适配器实现都必须满足这些行为
export function progressContract(name, UcProgress) {
  describe(`UcProgress 契约 [${name}]`, () => {
    it('渲染进度百分比文本', () => {
      const wrapper = mount(UcProgress, { props: { percentage: 50 } })
      expect(wrapper.text()).toContain('50')
    })

    it('$attrs 透传底层原生 props', () => {
      const wrapper = mount(UcProgress, {
        props: { percentage: 50, 'data-testid': 'my-progress' },
      })
      expect(wrapper.html()).toContain('data-testid="my-progress"')
    })
  })
}
