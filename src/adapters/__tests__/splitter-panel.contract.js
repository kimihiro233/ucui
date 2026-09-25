import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

// UcSplitterPanel 统一契约
// size/min/max(number|px 字符串|%字符串) / resizable(默认 true) / collapsible + @update:size
export function splitterPanelContract(libName, UcSplitter, UcSplitterPanel) {
  const isElement = libName === 'element-plus'
  const panelSelector = isElement ? '.el-splitter-panel' : '.uc-splitter-panel'

  const mountPanels = (firstProps = {}) =>
    mount(UcSplitter, {
      slots: {
        default: () => [
          h(UcSplitterPanel, firstProps, { default: () => 'A' }),
          h(UcSplitterPanel, { min: 0 }, { default: () => 'B' }),
        ],
      },
    })

  describe(`UcSplitterPanel 契约 [${libName}]`, () => {
    it('渲染面板与内容', () => {
      const wrapper = mountPanels()
      const panels = wrapper.findAll(panelSelector)
      expect(panels).toHaveLength(2)
      expect(panels[0].text()).toBe('A')
    })

    it('size/min/max/resizable/collapsible 映射到底层', () => {
      const wrapper = mountPanels({
        size: '120px',
        min: 40,
        max: 500,
        resizable: false,
        collapsible: true,
      })
      if (isElement) {
        const inner = wrapper.findComponent({ name: 'ElSplitterPanel' })
        expect(inner.props('size')).toBe('120px')
        expect(inner.props('min')).toBe(40)
        expect(inner.props('max')).toBe(500)
        expect(inner.props('resizable')).toBe(false)
        expect(inner.props('collapsible')).toBe(true)
      } else {
        // antd 兜底：UcSplitterPanel 即本体
        const inner = wrapper.findComponent(UcSplitterPanel)
        expect(inner.props('size')).toBe('120px')
        expect(inner.props('min')).toBe(40)
        expect(inner.props('max')).toBe(500)
        expect(inner.props('resizable')).toBe(false)
        expect(inner.props('collapsible')).toBe(true)
      }
    })

    it('resizable 默认 true', () => {
      const wrapper = mountPanels()
      if (isElement) {
        expect(wrapper.findComponent({ name: 'ElSplitterPanel' }).props('resizable')).toBe(true)
      } else {
        expect(wrapper.findComponent(UcSplitterPanel).props('resizable')).toBe(true)
      }
    })

    it('update:size 透传（element 声明式 emits；antd 侧由真实拖拽触发，见专属 spec）', () => {
      if (!isElement) return
      const wrapper = mountPanels()
      wrapper.findComponent({ name: 'ElSplitterPanel' }).vm.$emit('update:size', 320)
      const firstPanel = wrapper.findAllComponents(UcSplitterPanel)[0]
      expect(firstPanel.emitted('update:size')[0]).toEqual([320])
    })

    it('class 逃生舱落到面板元素', () => {
      const wrapper = mountPanels({ class: 'my-panel' })
      expect(wrapper.find(panelSelector).html()).toContain('my-panel')
    })
  })
}
