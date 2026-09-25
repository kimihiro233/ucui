import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSkeleton from '../antd/skeleton'
import { skeletonContract } from './skeleton.contract'

skeletonContract('ant-design-vue', UcSkeleton)

describe('UcSkeleton ant-design-vue 专属映射', () => {
  it('active 直接映射（类名 ant-skeleton-active）', () => {
    const wrapper = mount(UcSkeleton, {
      props: { loading: true, active: true },
    })
    expect(wrapper.find('.ant-skeleton').classes()).toContain('ant-skeleton-active')
  })

  it('rows 映射为 paragraph.rows', () => {
    const wrapper = mount(UcSkeleton, {
      props: { loading: true, rows: 4 },
    })
    expect(wrapper.findComponent({ name: 'ASkeleton' }).props('paragraph')).toEqual({ rows: 4 })
  })
})
