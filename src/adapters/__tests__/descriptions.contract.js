import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

// UcDescriptions 统一契约：所有适配器实现都必须满足这些行为
export function descriptionsContract(name, UcDescriptions) {
  const items = [
    { label: '姓名', value: '张三' },
    { label: '城市', value: '上海' },
  ]

  const mountDescriptions = (props = {}, slots = {}) =>
    mount(UcDescriptions, { props: { items, ...props }, slots })

  describe(`UcDescriptions 契约 [${name}]`, () => {
    it('渲染描述列表容器', () => {
      const wrapper = mountDescriptions()
      expect(wrapper.find('.el-descriptions, .ant-descriptions').exists()).toBe(true)
    })

    it('渲染 title', () => {
      const wrapper = mountDescriptions({ title: '用户信息' })
      expect(wrapper.text()).toContain('用户信息')
    })

    it('渲染所有 label 与 value', () => {
      const wrapper = mountDescriptions()
      expect(wrapper.text()).toContain('姓名')
      expect(wrapper.text()).toContain('张三')
      expect(wrapper.text()).toContain('城市')
      expect(wrapper.text()).toContain('上海')
    })

    it('bordered 呈现边框语义', () => {
      // element: 单元格 is-bordered-label/is-bordered-content；antd: 根类 ant-descriptions-bordered
      const wrapper = mountDescriptions({ bordered: true })
      expect(wrapper.find('[class*="bordered"]').exists()).toBe(true)
    })

    it('默认不带边框语义', () => {
      const wrapper = mountDescriptions()
      expect(wrapper.find('[class*="bordered"]').exists()).toBe(false)
    })

    it('渲染 extra 插槽', () => {
      const wrapper = mountDescriptions(
        { title: '用户信息' },
        { extra: '<button class="desc-extra">编辑</button>' },
      )
      expect(wrapper.find('.desc-extra').exists()).toBe(true)
    })

    it('item.render 自定义内容优先于 value', () => {
      const wrapper = mount(UcDescriptions, {
        props: {
          items: [{ label: '操作', render: () => h('button', { class: 'op-btn' }, '编辑') }],
        },
      })
      expect(wrapper.find('.op-btn').exists()).toBe(true)
      expect(wrapper.text()).toContain('编辑')
    })
  })
}
