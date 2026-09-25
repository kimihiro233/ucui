import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcSplitter from '../element/splitter'
import UcSplitterPanel from '../element/splitter-panel'
import { splitterPanelContract } from './splitter-panel.contract'

splitterPanelContract('element-plus', UcSplitter, UcSplitterPanel)

describe('UcSplitterPanel element-plus 专属映射', () => {
  it('collapsible 对象形式 {start,end} 透传', () => {
    // element-plus 2.14.6 运行时 getCollapsible 支持对象方向控制，
    // 但 split-panel.mjs 的 prop 类型误标为 Boolean（上游声明 bug），此处屏蔽其类型告警
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(UcSplitter, {
      slots: {
        default: () => [
          h(UcSplitterPanel, { collapsible: { start: true, end: false } }, { default: () => 'A' }),
          h(UcSplitterPanel, null, { default: () => 'B' }),
        ],
      },
    })
    expect(wrapper.findComponent({ name: 'ElSplitterPanel' }).props('collapsible')).toEqual({
      start: true,
      end: false,
    })
    warnSpy.mockRestore()
  })
})
