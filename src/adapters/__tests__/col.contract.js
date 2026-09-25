import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcCol 统一契约：span(默认 24)/offset/pull/push + xs/sm/md/lg/xl
// 双端 prop 名一致，类名分别为 el-col-N / ant-col-N
export function colContract(libName, UcCol) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElCol' : 'ACol'
  const rootSelector = isElement ? '.el-col' : '.ant-col'

  const mountCol = (props = {}) =>
    mount(UcCol, { props, slots: { default: '<div class="col-child">列</div>' } })

  describe(`UcCol 契约 [${libName}]`, () => {
    it('渲染列容器与默认插槽', () => {
      const wrapper = mountCol()
      expect(wrapper.find(rootSelector).exists()).toBe(true)
      expect(wrapper.find('.col-child').text()).toBe('列')
    })

    it('默认 span=24，自定义 span 生成对应栅格类', () => {
      const wrapperDefault = mountCol()
      expect(wrapperDefault.findComponent({ name: innerName }).props('span')).toBe(24)
      expect(wrapperDefault.find(rootSelector).classes()).toContain(
        isElement ? 'el-col-24' : 'ant-col-24',
      )

      const wrapper = mountCol({ span: 12 })
      expect(wrapper.find(rootSelector).classes()).toContain(
        isElement ? 'el-col-12' : 'ant-col-12',
      )
    })

    it('offset 映射并生成偏移类', () => {
      const wrapper = mountCol({ span: 12, offset: 6 })
      expect(wrapper.findComponent({ name: innerName }).props('offset')).toBe(6)
      expect(wrapper.find(rootSelector).classes()).toContain(
        isElement ? 'el-col-offset-6' : 'ant-col-offset-6',
      )
    })

    it('pull/push 映射到底层', () => {
      const wrapper = mountCol({ pull: 2, push: 3 })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props('pull')).toBe(2)
      expect(inner.props('push')).toBe(3)
    })

    it('响应式断点 number 与 object 两种形式映射', () => {
      const wrapper = mountCol({ xs: 24, md: { span: 8, offset: 2 } })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props('xs')).toBe(24)
      expect(inner.props('md')).toEqual({ span: 8, offset: 2 })
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountCol({ class: 'my-col' })
      expect(wrapper.html()).toContain('my-col')
    })
  })
}
