import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCheckTag from '../antd/check-tag'
import { checkTagContract } from './check-tag.contract'

checkTagContract('antd', UcCheckTag)

describe('UcCheckTag ant-design-vue 专属映射', () => {
  it('checked 直传 ACheckableTag', () => {
    const wrapper = mount(UcCheckTag, {
      props: { checked: true },
      slots: { default: () => 'A' },
    })
    const inner = wrapper.findComponent({ name: 'ACheckableTag' })
    expect(inner.props('checked')).toBe(true)
  })

  it('disabled/type 不落为 DOM 属性（antd 无对应能力）', () => {
    const wrapper = mount(UcCheckTag, {
      props: { disabled: true, type: 'success' },
      slots: { default: () => 'A' },
    })
    const attrs = wrapper.find('.ant-tag-checkable').attributes()
    expect(attrs.disabled).toBeUndefined()
    expect(attrs.type).toBeUndefined()
  })

  it('disabled 由适配器拦截并加禁用视觉样式', () => {
    const wrapper = mount(UcCheckTag, {
      props: { disabled: true },
      slots: { default: () => 'A' },
    })
    const style = wrapper.find('.ant-tag-checkable').attributes('style') || ''
    expect(style).toContain('opacity: 0.5')
    expect(style).toContain('not-allowed')
  })
})
