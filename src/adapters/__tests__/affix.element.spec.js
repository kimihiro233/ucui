import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAffix from '../element/affix'
import { affixContract } from './affix.contract'

affixContract('element-plus', UcAffix)

describe('UcAffix element-plus 专属映射', () => {
  it('渲染 el-affix 根节点', () => {
    const wrapper = mount(UcAffix, {
      slots: { default: '<div>内容</div>' },
    })
    expect(wrapper.find('.el-affix').exists()).toBe(true)
  })

  it('zIndex 等 element 独有能力经 attrs 逃生舱透传', () => {
    const wrapper = mount(UcAffix, {
      props: { zIndex: 500 },
      slots: { default: '<div>内容</div>' },
    })
    const inner = wrapper.findComponent({ name: 'ElAffix' })
    expect(inner.props('zIndex')).toBe(500)
  })
})
