import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, resolveComponent } from 'vue'

import UniUI, { registered, _clear } from '@/core'

// 通过 resolveComponent 模拟业务侧的全局组件使用方式
const BusinessPage = defineComponent({
  setup() {
    return () => h(resolveComponent('UcButton'), { type: 'primary' }, () => '确定')
  },
})

describe('UniUI 插件', () => {
  beforeEach(() => {
    _clear()
  })

  it('lib=element 时注册 element 实现', async () => {
    const wrapper = mount(BusinessPage, {
      global: { plugins: [[UniUI, { lib: 'element' }]] },
    })
    expect(registered()).toContain('UcButton')
    expect(wrapper.find('button').classes()).toContain('el-button--primary')
  })

  it('lib=antd 时注册 antd 实现', async () => {
    const wrapper = mount(BusinessPage, {
      global: { plugins: [[UniUI, { lib: 'antd' }]] },
    })
    expect(registered()).toContain('UcButton')
    expect(wrapper.find('button').classes()).toContain('ant-btn-primary')
  })

  it('不支持的 lib 抛出明确错误', () => {
    const app = { component: () => {} }
    expect(() => UniUI.install(app, { lib: 'unknown' })).toThrow('不支持的底层库')
  })
})
