import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcPagination 统一契约：所有适配器实现都必须满足这些行为
// 两端页码都是 li 元素，用精确文本定位页码项（避开前后的箭头按钮）
export function paginationContract(name, UcPagination) {
  const findPageItem = (wrapper, page) =>
    wrapper.findAll('li').find((n) => n.text().trim() === String(page))

  const mountPagination = (props = {}, options = {}) =>
    mount(UcPagination, {
      props: { modelValue: 1, total: 50, pageSize: 10, ...props },
      ...options,
    })

  describe(`UcPagination 契约 [${name}]`, () => {
    it('渲染全部页码', () => {
      const wrapper = mountPagination()
      expect(findPageItem(wrapper, 1)).toBeTruthy()
      expect(findPageItem(wrapper, 5)).toBeTruthy()
    })

    it('点击页码触发 update:modelValue', async () => {
      const wrapper = mountPagination()
      await findPageItem(wrapper, 2).trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([2])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcPagination },
        data: () => ({ page: 1 }),
        template: '<UcPagination v-model="page" :total="50" :page-size="10" />',
      })
      const item = wrapper.findAll('li').find((n) => n.text().trim() === '2')
      await item.trigger('click')
      expect(wrapper.vm.page).toBe(2)
    })
  })
}
