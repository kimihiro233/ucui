import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcDescriptions from '../antd/descriptions'
import { descriptionsContract } from './descriptions.contract'

descriptionsContract('ant-design-vue', UcDescriptions)

describe('UcDescriptions ant-design-vue 专属映射', () => {
  const items = [
    { label: '姓名', value: '张三' },
    { label: '城市', value: '上海' },
  ]

  it('bordered 直映 ADescriptions', () => {
    const wrapper = mount(UcDescriptions, { props: { items, bordered: true } })
    expect(wrapper.findComponent({ name: 'ADescriptions' }).props('bordered')).toBe(true)
  })

  it('size default 映射为 middle', () => {
    const wrapper = mount(UcDescriptions, { props: { items, size: 'default' } })
    expect(wrapper.findComponent({ name: 'ADescriptions' }).props('size')).toBe('middle')
  })

  it('items 渲染为描述项且 span 映射为 colspan', () => {
    const wrapper = mount(UcDescriptions, {
      props: { items: [{ label: '备注', value: '无', span: 2 }] },
    })
    // ADescriptionsItem 是标记组件，不挂载实例，直接断言渲染结果
    expect(wrapper.text()).toContain('备注')
    expect(wrapper.text()).toContain('无')
    expect(wrapper.find('td[colspan="2"]').exists()).toBe(true)
  })
})
