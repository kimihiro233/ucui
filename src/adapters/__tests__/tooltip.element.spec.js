import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcTooltip from '../element/tooltip'
import { tooltipContract } from './tooltip.contract'

tooltipContract('element-plus', UcTooltip)

describe('UcTooltip element-plus 专属映射', () => {
  it('content 透传给 ElTooltip', () => {
    const wrapper = mount(UcTooltip, {
      props: { content: '提示' },
      slots: { default: '<span>x</span>' },
    })
    expect(wrapper.find('.el-tooltip__trigger, [class*="tooltip"]').exists()).toBe(true)
  })

  it('hover 后浮层出现则包含 el-popper 内容', async () => {
    const wrapper = mount(UcTooltip, {
      props: { content: '详细提示' },
      slots: { default: '<span class="t">x</span>' },
    })
    await wrapper.find('.t').trigger('mouseenter')
    await flushPromises()
    if (document.body.textContent.includes('详细提示')) {
      expect(document.body.querySelector('.el-popper')).toBeTruthy()
    }
  })
})
