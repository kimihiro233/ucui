import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTag from '../antd/tag'
import { tagContract } from './tag.contract'

tagContract('ant-design-vue', UcTag)

describe('UcTag ant-design-vue 专属映射', () => {
  it('type=danger 映射为 color=error', () => {
    const wrapper = mount(UcTag, { props: { type: 'danger' }, slots: { default: 'x' } })
    expect(wrapper.find('.ant-tag').classes()).toContain('ant-tag-error')
  })

  it('type=default 无预设色类名', () => {
    const wrapper = mount(UcTag, { slots: { default: 'x' } })
    const classes = wrapper.find('.ant-tag').classes()
    expect(classes.some((c) => c.startsWith('ant-tag-'))).toBe(false)
  })
})
