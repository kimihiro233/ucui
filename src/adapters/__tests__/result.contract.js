import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcResult 统一契约：所有适配器实现都必须满足这些行为
export function resultContract(name, UcResult) {
  const mountResult = (props = {}, slots = {}) => mount(UcResult, { props, slots })

  describe(`UcResult 契约 [${name}]`, () => {
    it('渲染结果容器', () => {
      const wrapper = mountResult()
      expect(wrapper.find('.el-result, .ant-result').exists()).toBe(true)
    })

    it('渲染 title 与 subTitle', () => {
      const wrapper = mountResult({ title: '操作成功', subTitle: '请根据提示继续' })
      expect(wrapper.text()).toContain('操作成功')
      expect(wrapper.text()).toContain('请根据提示继续')
    })

    it('渲染 extra 插槽', () => {
      const wrapper = mountResult(
        { title: '标题' },
        { extra: '<button class="result-extra">返回首页</button>' },
      )
      expect(wrapper.find('.result-extra').exists()).toBe(true)
    })

    it('status=success 呈现成功语义', () => {
      const wrapper = mountResult({ status: 'success', title: '标题' })
      // element: 图标类 icon-success；antd: 根类 ant-result-success
      expect(wrapper.find('[class*="success"]').exists()).toBe(true)
    })

    it('status=error 呈现失败语义', () => {
      const wrapper = mountResult({ status: 'error', title: '标题' })
      // element: 图标类 icon-error；antd: 根类 ant-result-error
      expect(wrapper.find('[class*="error"]').exists()).toBe(true)
    })
  })
}
