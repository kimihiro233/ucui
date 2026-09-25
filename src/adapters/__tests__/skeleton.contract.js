import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcSkeleton 统一契约：所有适配器实现都必须满足这些行为
export function skeletonContract(name, UcSkeleton) {
  describe(`UcSkeleton 契约 [${name}]`, () => {
    it('loading=true 时渲染骨架', () => {
      const wrapper = mount(UcSkeleton, { props: { loading: true } })
      expect(wrapper.find('.el-skeleton, .ant-skeleton').exists()).toBe(true)
    })

    it('loading=false 时渲染默认插槽真实内容', () => {
      const wrapper = mount(UcSkeleton, {
        props: { loading: false },
        slots: { default: '<p class="real-content">真实内容</p>' },
      })
      expect(wrapper.find('.real-content').exists()).toBe(true)
      expect(wrapper.find('.el-skeleton__placeholder, .ant-skeleton-content').exists()).toBe(false)
    })

    it('active 时带动画类名', () => {
      const wrapper = mount(UcSkeleton, {
        props: { loading: true, active: true },
      })
      // element 动画类 is-animated；antd 动画类 ant-skeleton-active
      expect(
        wrapper.find('.el-skeleton.is-animated, .ant-skeleton.ant-skeleton-active').exists(),
      ).toBe(true)
    })

    it('rows 控制段落占位行数', () => {
      const wrapper = mount(UcSkeleton, {
        props: { loading: true, rows: 4 },
      })
      if (name === 'element-plus') {
        // element 占位块 = 标题 1 + 段落 rows，共 rows+1 个 .el-skeleton__p
        expect(wrapper.findAll('.el-skeleton__p').length).toBe(5)
      } else {
        const rows = wrapper.findAll('.ant-skeleton-paragraph > li')
        expect(rows.length).toBe(4)
      }
    })
  })
}
