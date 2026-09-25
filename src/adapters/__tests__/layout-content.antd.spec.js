import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutContent from '../antd/layout-content'
import { layoutContentContract } from './layout-content.contract'

layoutContentContract('ant-design-vue', UcLayoutContent)

describe('UcLayoutContent ant-design-vue 专属映射', () => {
  it('渲染 Layout.Content（ALayoutContent）', () => {
    const wrapper = mount(UcLayoutContent, { slots: { default: '正文' } })
    expect(wrapper.findComponent({ name: 'ALayoutContent' }).exists()).toBe(true)
  })
})
