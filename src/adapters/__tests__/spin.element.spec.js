import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcSpin from '../element/spin'
import { spinContract } from './spin.contract'

spinContract('element-plus', UcSpin)

describe('UcSpin element-plus 专属映射', () => {
  it('spinning 渲染 el-loading-mask', async () => {
    const wrapper = mount(UcSpin, {
      props: { spinning: true },
      slots: { default: '<p class="c">x</p>' },
    })
    await flushPromises()
    expect(wrapper.find('.el-loading-mask').exists()).toBe(true)
    // 原内容仍渲染
    expect(wrapper.find('.c').exists()).toBe(true)
  })

  it('tip 映射为 loading text', async () => {
    const wrapper = mount(UcSpin, {
      props: { spinning: true, tip: '请稍候' },
    })
    await flushPromises()
    expect(wrapper.find('.el-loading-spinner').text()).toContain('请稍候')
  })
})
