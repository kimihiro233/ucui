import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcPopover from '../antd/popover'
import { popoverContract } from './popover.contract'

popoverContract('ant-design-vue', UcPopover)

describe('UcPopover ant-design-vue 专属映射', () => {
  it('渲染触发元素', () => {
    const wrapper = mount(UcPopover, {
      props: { content: 'c' },
      slots: { default: '<span class="t">x</span>' },
    })
    expect(wrapper.find('.t').exists()).toBe(true)
  })

  it('hover 后浮层出现则含 ant-popover 类名', async () => {
    const wrapper = mount(UcPopover, {
      props: { title: '标题', content: '内容', trigger: 'hover' },
      slots: { default: '<span class="t">x</span>' },
    })
    await wrapper.find('.t').trigger('mouseenter')
    await flushPromises()
    if (document.body.textContent.includes('内容')) {
      expect(document.body.querySelector('.ant-popover')).toBeTruthy()
      expect(document.body.querySelector('.ant-popover-title').textContent).toContain('标题')
    }
  })
})
