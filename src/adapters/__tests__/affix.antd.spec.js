import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAffix from '../antd/affix'
import { affixContract } from './affix.contract'

affixContract('ant-design-vue', UcAffix)

describe('UcAffix ant-design-vue 专属映射', () => {
  it('默认 position=top 时只传 offsetTop', () => {
    const wrapper = mount(UcAffix, {
      slots: { default: '<div>内容</div>' },
    })
    const inner = wrapper.findComponent({ name: 'AAffix' })
    expect(inner.props('offsetTop')).toBe(0)
    expect(inner.props('offsetBottom')).toBeUndefined()
  })

  it('未指定 target 时不覆盖底层默认 target（返回 window）', () => {
    const wrapper = mount(UcAffix, {
      slots: { default: '<div>内容</div>' },
    })
    const targetFn = wrapper.findComponent({ name: 'AAffix' }).props('target')
    expect(typeof targetFn).toBe('function')
    expect(targetFn()).toBe(window)
  })
})
