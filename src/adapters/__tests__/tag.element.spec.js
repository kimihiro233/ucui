import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTag from '../element/tag'
import { tagContract } from './tag.contract'

tagContract('element-plus', UcTag)

describe('UcTag element-plus 专属映射', () => {
  it('type=danger 映射为 el-tag--danger', () => {
    const wrapper = mount(UcTag, { props: { type: 'danger' }, slots: { default: 'x' } })
    expect(wrapper.find('.el-tag').classes()).toContain('el-tag--danger')
  })

  it('type=default 映射为 info 灰色', () => {
    const wrapper = mount(UcTag, { slots: { default: 'x' } })
    expect(wrapper.find('.el-tag').classes()).toContain('el-tag--info')
  })
})
