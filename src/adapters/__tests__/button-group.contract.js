import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

// UcButtonGroup 统一契约
// props: size(large|default|small) / type(primary|default|danger)
// / direction(horizontal|vertical，仅 element 生效)
// group 的 size/type 必须穿透 UcButton 包装作用到每个底层按钮
export function buttonGroupContract(libName, UcButtonGroup, UcButton) {
  const isElement = libName === 'element-plus'
  const groupSel = isElement ? '.el-button-group' : '.ant-btn-group'
  const innerName = isElement ? 'ElButton' : 'AButton'

  const mountGroup = (props = {}, n = 3) =>
    mount(UcButtonGroup, {
      props,
      slots: {
        default: () =>
          Array.from({ length: n }, (_, i) =>
            h(UcButton, null, { default: () => `按钮${i + 1}` }),
          ),
      },
    })

  describe(`UcButtonGroup 契约 [${libName}]`, () => {
    it('渲染按钮组容器', () => {
      const wrapper = mountGroup()
      expect(wrapper.find(groupSel).exists()).toBe(true)
    })

    it('默认插槽按钮全部渲染', () => {
      const wrapper = mountGroup({}, 3)
      const buttons = wrapper.findAllComponents({ name: innerName })
      expect(buttons).toHaveLength(3)
      expect(buttons.map((b) => b.text())).toEqual(['按钮1', '按钮2', '按钮3'])
    })

    it('size=large 作用到每个底层按钮', () => {
      const wrapper = mountGroup({ size: 'large' })
      const buttons = wrapper.findAllComponents({ name: innerName })
      expect(buttons).toHaveLength(3)
      buttons.forEach((b) => expect(b.props('size')).toBe('large'))
    })

    it('size=small 作用到每个底层按钮', () => {
      const wrapper = mountGroup({ size: 'small' })
      wrapper.findAllComponents({ name: innerName }).forEach((b) => {
        expect(b.props('size')).toBe('small')
      })
    })

    it('type=primary 作用到每个底层按钮', () => {
      const wrapper = mountGroup({ type: 'primary' })
      const buttons = wrapper.findAllComponents({ name: innerName })
      buttons.forEach((b) => {
        expect(b.props('type')).toBe('primary')
      })
    })

    it('class 逃生舱落到容器', () => {
      const wrapper = mount(UcButtonGroup, {
        attrs: { class: 'my-group' },
        slots: { default: () => [h(UcButton, null, { default: () => 'x' })] },
      })
      expect(wrapper.find(groupSel).classes()).toContain('my-group')
    })
  })
}
