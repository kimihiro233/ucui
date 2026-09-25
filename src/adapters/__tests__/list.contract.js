import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcList 契约：两端都必须满足的列表行为
// element 兜底类名 uc-list-*（后缀对齐 antd），antd 原生 ant-list-*，选择器按后缀分支
export function listContract(libName, UcList) {
  const isElement = libName === 'element-plus'
  const prefix = isElement ? 'uc-list' : 'ant-list'
  const rootSel = `.${prefix}`
  const itemSel = `li.${prefix}-item`
  const sel = (suffix) => `.${prefix}-${suffix}`
  const baseItems = [
    { key: 'a', title: '标题A', description: '描述A' },
    { key: 'b', title: '标题B', content: '正文B' },
  ]

  describe(`UcList 契约 [${libName}]`, () => {
    it('基础渲染：title/description/content', () => {
      const w = mount(UcList, { props: { items: baseItems } })
      expect(w.find(rootSel).exists()).toBe(true)
      const text = w.text()
      expect(text).toContain('标题A')
      expect(text).toContain('描述A')
      expect(text).toContain('正文B')
      w.unmount()
    })

    it('item 数量正确', () => {
      const w = mount(UcList, { props: { items: baseItems } })
      expect(w.findAll(itemSel)).toHaveLength(2)
      w.unmount()
    })

    it('header/footer 渲染', () => {
      const w = mount(UcList, { props: { items: baseItems, header: '列表头', footer: '列表尾' } })
      expect(w.find(sel('header')).text()).toBe('列表头')
      expect(w.find(sel('footer')).text()).toBe('列表尾')
      w.unmount()
    })

    it('split 默认开启、bordered 默认关闭', () => {
      const w = mount(UcList, { props: { items: baseItems } })
      const cls = w.find(rootSel).classes()
      expect(cls).toContain(`${prefix}-split`)
      expect(cls).not.toContain(`${prefix}-bordered`)
      w.unmount()
    })

    it('bordered=true 渲染边框类', () => {
      const w = mount(UcList, { props: { items: baseItems, bordered: true } })
      expect(w.find(rootSel).classes()).toContain(`${prefix}-bordered`)
      w.unmount()
    })

    it('size small → sm 类', () => {
      const w = mount(UcList, { props: { items: baseItems, size: 'small' } })
      expect(w.find(rootSel).classes()).toContain(`${prefix}-sm`)
      w.unmount()
    })

    it('actions/extra 渲染', () => {
      const w = mount(UcList, {
        props: { items: [{ key: 'a', title: 'T', actions: ['编辑', '删除'], extra: '额外' }] },
      })
      const text = w.text()
      expect(text).toContain('编辑')
      expect(text).toContain('删除')
      expect(text).toContain('额外')
      w.unmount()
    })

    it('avatar 渲染 img', () => {
      const w = mount(UcList, {
        props: { items: [{ key: 'a', title: 'T', avatar: 'https://x.test/a.png' }] },
      })
      expect(w.find(`${sel('item-meta-avatar')} img`).exists()).toBe(true)
      w.unmount()
    })

    it('itemLayout vertical → vertical 类', () => {
      const w = mount(UcList, { props: { items: baseItems, itemLayout: 'vertical' } })
      expect(w.find(rootSel).classes()).toContain(`${prefix}-vertical`)
      w.unmount()
    })

    it('loading → loading 类', () => {
      const w = mount(UcList, { props: { items: baseItems, loading: true } })
      expect(w.find(rootSel).classes()).toContain(`${prefix}-loading`)
      w.unmount()
    })

    it('空数据渲染空态', () => {
      const w = mount(UcList, { props: { items: [] } })
      expect(w.find(sel('empty-text')).exists()).toBe(true)
      w.unmount()
    })
  })
}
