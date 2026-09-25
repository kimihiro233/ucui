import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcSpace 统一契约：
// direction/size(large|default|small|number|[h,v])/align/wrap/fill(element 独有)
// 默认插槽；#separator 在每项之间插入分隔内容
// element：alignment 对齐、spacer 是 prop；antd：align 对齐、split 插槽、default→middle
export function spaceContract(libName, UcSpace) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElSpace' : 'ASpace'
  const itemSelector = isElement ? '.el-space__item' : '.ant-space-item'

  const threeChildren =
    '<div class="s1">1</div><div class="s2">2</div><div class="s3">3</div>'

  const mountSpace = (props = {}, slots = {}) =>
    mount(UcSpace, {
      props,
      slots: { default: threeChildren, ...slots },
    })

  describe(`UcSpace 契约 [${libName}]`, () => {
    it('渲染全部子节点（每项被间距容器包裹）', () => {
      const wrapper = mountSpace()
      expect(wrapper.findAll(itemSelector).length).toBe(3)
      expect(wrapper.find('.s1').text()).toBe('1')
      expect(wrapper.find('.s3').text()).toBe('3')
    })

    it('direction 映射到底层', () => {
      const wrapper = mountSpace({ direction: 'vertical' })
      expect(wrapper.findComponent({ name: innerName }).props('direction')).toBe(
        'vertical',
      )
    })

    it('size 档位映射：统一 default（antd 转 middle，element 直映）', () => {
      const wrapper = mountSpace({ size: 'default' })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props('size')).toBe(isElement ? 'default' : 'middle')
    })

    it('size 数字与数组原样透传', () => {
      const wrapperNumber = mountSpace({ size: 20 })
      expect(wrapperNumber.findComponent({ name: innerName }).props('size')).toBe(20)

      const wrapperArray = mountSpace({ size: [10, 20] })
      expect(wrapperArray.findComponent({ name: innerName }).props('size')).toEqual([
        10, 20,
      ])
    })

    it('align 对齐映射：element alignment / antd align', () => {
      const wrapper = mountSpace({ align: 'start' })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props(isElement ? 'alignment' : 'align')).toBe('start')
    })

    it('wrap 映射到底层', () => {
      const wrapper = mountSpace({ wrap: true })
      expect(wrapper.findComponent({ name: innerName }).props('wrap')).toBe(true)
    })

    it('#separator 在每两项之间渲染分隔内容（3 项 = 2 个分隔）', () => {
      const wrapper = mountSpace(
        {},
        { separator: '<span class="my-sep">|</span>' },
      )
      expect(wrapper.findAll('.my-sep').length).toBe(2)
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountSpace({ class: 'my-space' })
      expect(wrapper.html()).toContain('my-space')
    })
  })
}
