import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcBadge from '../element/badge'
import { badgeContract } from './badge.contract'

badgeContract('element-plus', UcBadge)

describe('UcBadge element-plus 专属映射', () => {
  it('value 渲染在 el-badge__content', () => {
    const wrapper = mount(UcBadge, { props: { value: 5 } })
    expect(wrapper.find('.el-badge__content').text()).toBe('5')
  })
})
