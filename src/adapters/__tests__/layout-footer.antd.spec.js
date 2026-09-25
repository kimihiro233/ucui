import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutFooter from '../antd/layout-footer'
import { layoutFooterContract } from './layout-footer.contract'

layoutFooterContract('ant-design-vue', UcLayoutFooter)

describe('UcLayoutFooter ant-design-vue 专属映射', () => {
  it('height 映射为 inline style.height', () => {
    const wrapper = mount(UcLayoutFooter, {
      props: { height: 72 },
      slots: { default: '底' },
    })
    const style = wrapper.find('.ant-layout-footer').attributes('style') || ''
    expect(style).toContain('height: 72px')
  })
})
