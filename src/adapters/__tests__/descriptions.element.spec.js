import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcDescriptions from '../element/descriptions'
import { descriptionsContract } from './descriptions.contract'

descriptionsContract('element-plus', UcDescriptions)

describe('UcDescriptions element-plus 专属映射', () => {
  const items = [
    { label: '姓名', value: '张三' },
    { label: '城市', value: '上海' },
  ]

  it('bordered 映射为 ElDescriptions 的 border prop', () => {
    const wrapper = mount(UcDescriptions, { props: { items, bordered: true } })
    expect(wrapper.findComponent({ name: 'ElDescriptions' }).props('border')).toBe(true)
  })

  it('size 透传（element 档位同名）', () => {
    const wrapper = mount(UcDescriptions, { props: { items, size: 'small' } })
    expect(wrapper.findComponent({ name: 'ElDescriptions' }).props('size')).toBe('small')
  })

  it('items 渲染为描述项且 span 映射为 colspan', () => {
    // ElDescriptionsItem 是标记组件，不挂载实例，直接断言渲染结果；
    // 注意 element 会把行尾项 span 填充至整行，故用两项让 span=2 生效
    const wrapper = mount(UcDescriptions, {
      props: {
        items: [
          { label: '姓名', value: '张三' },
          { label: '备注', value: '无', span: 2 },
        ],
      },
    })
    expect(wrapper.text()).toContain('备注')
    expect(wrapper.text()).toContain('无')
    expect(wrapper.find('td[colspan="2"]').exists()).toBe(true)
  })
})
