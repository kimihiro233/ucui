import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSkeleton from '../element/skeleton'
import { skeletonContract } from './skeleton.contract'

skeletonContract('element-plus', UcSkeleton)

describe('UcSkeleton element-plus 专属映射', () => {
  it('active 映射为 animated', () => {
    const wrapper = mount(UcSkeleton, {
      props: { loading: true, active: true },
    })
    expect(wrapper.findComponent({ name: 'ElSkeleton' }).props('animated')).toBe(true)
    expect(wrapper.find('.el-skeleton').classes()).toContain('is-animated')
  })

  it('rows 映射为行数（默认 3）', () => {
    const wrapper = mount(UcSkeleton, { props: { loading: true } })
    expect(wrapper.findComponent({ name: 'ElSkeleton' }).props('rows')).toBe(3)
  })
})
