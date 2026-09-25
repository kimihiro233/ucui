import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcSpin from '../antd/spin'
import { spinContract } from './spin.contract'

spinContract('ant-design-vue', UcSpin)

describe('UcSpin ant-design-vue 专属映射', () => {
  it('spinning 渲染嵌套 loading 容器', async () => {
    const wrapper = mount(UcSpin, {
      props: { spinning: true },
      slots: { default: '<p class="c">x</p>' },
    })
    await flushPromises()
    expect(wrapper.find('.ant-spin-nested-loading').exists()).toBe(true)
    expect(wrapper.find('.ant-spin-spinning').exists()).toBe(true)
  })

  it('size 映射为大小类名', async () => {
    const wrapper = mount(UcSpin, {
      props: { spinning: true, size: 'small' },
    })
    await flushPromises()
    expect(wrapper.find('.ant-spin').classes()).toContain('ant-spin-sm')
  })
})
