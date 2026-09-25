import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcScrollbar 统一契约
// element 侧包 ElScrollbar；antd 侧为原生兜底（.uc-scrollbar 结构）
// height/maxHeight(number→px) / native / always / minSize / tag / wrapClass / viewClass
// @scroll({scrollTop,scrollLeft})；expose scrollTo/setScrollTop/setScrollLeft/update
export function scrollbarContract(libName, UcScrollbar) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElScrollbar' : null
  const rootSelector = isElement ? '.el-scrollbar' : '.uc-scrollbar'
  const wrapSelector = isElement ? '.el-scrollbar__wrap' : '.uc-scrollbar__wrap'
  const viewSelector = isElement ? '.el-scrollbar__view' : '.uc-scrollbar__view'

  const mountScrollbar = (props = {}, slots = {}) =>
    mount(UcScrollbar, {
      props,
      slots: { default: '<div class="scroll-child">可滚动内容</div>', ...slots },
    })

  describe(`UcScrollbar 契约 [${libName}]`, () => {
    it('渲染根/包裹/视图三层结构与默认插槽', () => {
      const wrapper = mountScrollbar()
      expect(wrapper.find(rootSelector).exists()).toBe(true)
      expect(wrapper.find(wrapSelector).exists()).toBe(true)
      expect(wrapper.find(viewSelector).exists()).toBe(true)
      expect(wrapper.find('.scroll-child').text()).toBe('可滚动内容')
    })

    it('height number 自动补 px（300）', () => {
      const wrapper = mountScrollbar({ height: 300 })
      const style = wrapper.find(wrapSelector).attributes('style') || ''
      expect(style).toContain('height: 300px')
    })

    it('maxHeight number 自动补 px（500）', () => {
      const wrapper = mountScrollbar({ maxHeight: 500 })
      const style = wrapper.find(wrapSelector).attributes('style') || ''
      expect(style).toContain('max-height: 500px')
    })

    it('字符串尺寸原样使用', () => {
      const wrapper = mountScrollbar({ height: '40vh', maxHeight: '60vh' })
      const style = wrapper.find(wrapSelector).attributes('style') || ''
      expect(style).toContain('height: 40vh')
      expect(style).toContain('max-height: 60vh')
    })

    it('tag 控制视图标签（section）', () => {
      const wrapper = mountScrollbar({ tag: 'section' })
      expect(wrapper.find(viewSelector).element.tagName).toBe('SECTION')
    })

    it('always 生效：element 传 prop，antd 根节点带常驻类', () => {
      const wrapper = mountScrollbar({ always: true })
      if (isElement) {
        expect(wrapper.findComponent({ name: innerName }).props('always')).toBe(true)
      } else {
        expect(wrapper.find(rootSelector).classes()).toContain('uc-scrollbar--always')
      }
    })

    it('native=true：element 传 prop，antd 包裹层不隐藏原生滚动条', () => {
      const wrapper = mountScrollbar({ native: true })
      if (isElement) {
        expect(wrapper.findComponent({ name: innerName }).props('native')).toBe(true)
      } else {
        expect(wrapper.find(wrapSelector).classes()).not.toContain(
          'uc-scrollbar__wrap--hidden-default',
        )
      }
    })

    it('minSize 映射（element 传 prop；antd 统一层保留值）', () => {
      const wrapper = mountScrollbar({ minSize: 40 })
      if (isElement) {
        expect(wrapper.findComponent({ name: innerName }).props('minSize')).toBe(40)
      } else {
        expect(wrapper.props('minSize')).toBe(40)
      }
    })

    it('wrapClass/viewClass 落到对应元素', () => {
      const wrapper = mountScrollbar({ wrapClass: 'my-wrap', viewClass: 'my-view' })
      if (isElement) {
        const inner = wrapper.findComponent({ name: innerName })
        expect(inner.props('wrapClass')).toBe('my-wrap')
        expect(inner.props('viewClass')).toBe('my-view')
      } else {
        expect(wrapper.find(wrapSelector).classes()).toContain('my-wrap')
        expect(wrapper.find(viewSelector).classes()).toContain('my-view')
      }
    })

    it('滚动时抛出 scroll({ scrollTop, scrollLeft })', async () => {
      const wrapper = mountScrollbar()
      await wrapper.find(wrapSelector).trigger('scroll')
      const events = wrapper.emitted('scroll')
      expect(events).toBeTruthy()
      expect(events[0][0]).toEqual({ scrollTop: 0, scrollLeft: 0 })
    })

    it('expose 命令式方法', () => {
      const wrapper = mountScrollbar()
      expect(typeof wrapper.vm.scrollTo).toBe('function')
      expect(typeof wrapper.vm.setScrollTop).toBe('function')
      expect(typeof wrapper.vm.setScrollLeft).toBe('function')
      expect(typeof wrapper.vm.update).toBe('function')
      // update 在双端均可安全调用
      expect(() => wrapper.vm.update()).not.toThrow()
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountScrollbar({ class: 'my-scrollbar' })
      expect(wrapper.html()).toContain('my-scrollbar')
    })
  })
}
