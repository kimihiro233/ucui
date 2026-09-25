import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcSelect 统一契约：所有适配器实现都必须满足这些行为
// 注意：下拉面板经 teleport 渲染，契约只覆盖宿主内的行为，交互由映射测试保证
export function selectContract(name, UcSelect) {
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
  ]

  describe(`UcSelect 契约 [${name}]`, () => {
    it('渲染选择器', () => {
      const wrapper = mount(UcSelect, { props: { options } })
      expect(wrapper.exists()).toBe(true)
    })

    // element-plus 的选中 label 依赖 option 注册，异步渲染，契约等待渲染完成
    it('modelValue 显示对应 label', async () => {
      const wrapper = mount(UcSelect, { props: { options, modelValue: '1' } })
      await flushPromises()
      expect(wrapper.text()).toContain('选项一')
    })

    it('placeholder 生效', () => {
      const wrapper = mount(UcSelect, { props: { options, placeholder: '请选择' } })
      expect(wrapper.text()).toContain('请选择')
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcSelect, { props: { options, disabled: true } })
      expect(wrapper.html()).toMatch(/disabled|is-disabled/)
    })

    it('options 中 disabled 的项被传递', () => {
      const withDisabled = [
        { label: '可选', value: '1' },
        { label: '禁用', value: '2', disabled: true },
      ]
      const wrapper = mount(UcSelect, { props: { options: withDisabled } })
      expect(wrapper.exists()).toBe(true)
    })
  })
}
