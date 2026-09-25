import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcText 统一契约
// props: type(default|success|info|warning|danger) / size(element 单边) /
// truncated(单行省略) / lineClamp(最大行数) / tag(element 单边)
export function textContract(libName, UcText) {
  const isElement = libName === 'element-plus'
  const rootSel = isElement ? '.el-text' : '.ant-typography'

  describe(`UcText 契约 [${libName}]`, () => {
    it('渲染文本根节点与内容', () => {
      const wrapper = mount(UcText, { slots: { default: () => 'Hello UcText' } })
      const root = wrapper.find(rootSel)
      expect(root.exists()).toBe(true)
      expect(root.text()).toContain('Hello UcText')
      expect(root.element.tagName).toBe('SPAN')
    })

    it('type=success 挂语义色类', () => {
      const wrapper = mount(UcText, {
        props: { type: 'success' },
        slots: { default: () => 'ok' },
      })
      expect(wrapper.find(rootSel).classes()).toContain(
        isElement ? 'el-text--success' : 'ant-typography-success',
      )
    })

    it('type=info 映射：element info / antd secondary', () => {
      const wrapper = mount(UcText, {
        props: { type: 'info' },
        slots: { default: () => 'info' },
      })
      expect(wrapper.find(rootSel).classes()).toContain(
        isElement ? 'el-text--info' : 'ant-typography-secondary',
      )
    })

    it('type=default 不挂任何语义色类', () => {
      const wrapper = mount(UcText, { slots: { default: () => 'plain' } })
      const classes = wrapper.find(rootSel).classes()
      expect(classes.some((c) => /(?:el-text--|ant-typography-)(?:success|info|warning|danger|secondary)/.test(c))).toBe(false)
    })

    it('truncated 单行省略：element is-truncated / antd ellipsis 类', async () => {
      const wrapper = mount(UcText, {
        props: { truncated: true },
        slots: { default: () => 'long long text' },
      })
      await nextTick()
      expect(wrapper.find(rootSel).classes()).toContain(
        isElement ? 'is-truncated' : 'ant-typography-ellipsis',
      )
    })

    it('lineClamp 行数限制桥接到底层', () => {
      // happy-dom CSSOM 会丢弃 -webkit-line-clamp 声明，无法从 DOM style 断言，
      // 分别验证底层组件收到 lineClamp（element）或等效 CSS 已下发（antd overflow）
      const wrapper = mount(UcText, {
        props: { lineClamp: 2 },
        slots: { default: () => 'multi lines' },
      })
      if (isElement) {
        expect(wrapper.findComponent({ name: 'ElText' }).props('lineClamp')).toBe(2)
      } else {
        expect(wrapper.find(rootSel).attributes('style') || '').toContain(
          'overflow: hidden',
        )
      }
    })

    it('class 逃生舱透传', () => {
      const wrapper = mount(UcText, {
        attrs: { class: 'my-text' },
        slots: { default: () => 'x' },
      })
      expect(wrapper.find(rootSel).classes()).toContain('my-text')
    })
  })
}
