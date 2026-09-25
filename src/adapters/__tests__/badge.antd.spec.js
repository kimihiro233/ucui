import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcBadge from '../antd/badge'
import { badgeContract } from './badge.contract'

badgeContract('ant-design-vue', UcBadge)

describe('UcBadge ant-design-vue 专属映射', () => {
  it('value 渲染在 ant-badge-count', () => {
    const wrapper = mount(UcBadge, { props: { value: 5 } })
    expect(wrapper.find('.ant-badge-count').text()).toBe('5')
  })
})
