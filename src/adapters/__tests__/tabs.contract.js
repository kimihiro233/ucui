import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcTabs 统一契约：所有适配器实现都必须满足这些行为
// 面板内容通过具名插槽（插槽名 = item.key）提供
export function tabsContract(name, UcTabs) {
  const sampleItems = [
    { key: 'a', label: '标签A' },
    { key: 'b', label: '标签B' },
  ]
  // element 页签头是 .el-tabs__item，antd 是 .ant-tabs-tab
  const findHeaders = (wrapper) => {
    const elItems = wrapper.findAll('.el-tabs__item')
    return elItems.length ? elItems : wrapper.findAll('.ant-tabs-tab')
  }

  const mountTabs = (props = {}, slots = {}) =>
    mount(UcTabs, {
      props: { modelValue: 'a', items: sampleItems, ...props },
      slots: {
        a: '<p class="pane-a">内容A</p>',
        b: '<p class="pane-b">内容B</p>',
        ...slots,
      },
    })

  describe(`UcTabs 契约 [${name}]`, () => {
    it('渲染全部页签头', () => {
      const wrapper = mountTabs()
      const headers = findHeaders(wrapper)
      expect(headers.length).toBe(2)
      expect(headers[0].text()).toContain('标签A')
      expect(headers[1].text()).toContain('标签B')
    })

    it('激活面板的内容可见', () => {
      const wrapper = mountTabs()
      expect(wrapper.find('.pane-a').exists()).toBe(true)
    })

    it('点击页签头触发 update:modelValue', async () => {
      const wrapper = mountTabs()
      await findHeaders(wrapper)[1].trigger('click')
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['b'])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcTabs },
        data: () => ({ active: 'a' }),
        template: `
          <UcTabs v-model="active" :items="[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]">
            <template #a><p class="pane-a">A</p></template>
            <template #b><p class="pane-b">B</p></template>
          </UcTabs>`,
      })
      await findHeaders(wrapper)[1].trigger('click')
      await nextTick()
      expect(wrapper.vm.active).toBe('b')
      expect(wrapper.find('.pane-b').exists()).toBe(true)
    })

    it('change 事件参数为 key', async () => {
      const wrapper = mountTabs()
      await findHeaders(wrapper)[1].trigger('click')
      await nextTick()
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual(['b'])
    })
  })
}
