import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcBacktop 统一契约
// props: visibilityHeight(默认200) / target(CSS 选择器) / right / bottom
// emits: click(event)；默认插槽自定义内容
// 显隐机制两端不同：element 是 v-if（未出现=不存在）且监听 document、
// 节流首次同步执行；antd 是 v-show（始终在 DOM）监听 window、rAF 节流
export function backtopContract(libName, UcBacktop) {
  const isElement = libName === 'element-plus'
  const btnSel = isElement ? '.el-backtop' : '.ant-float-btn'
  let wrapper

  // 滚过阈值让按钮出现
  async function showBacktop() {
    if (isElement) {
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 300,
        configurable: true,
      })
      document.dispatchEvent(new Event('scroll'))
      await nextTick()
    } else {
      // happy-dom 的 window 代理与 scroll 事件内部 target 不是同一对象，
      // defineProperty 代理属性读不到，必须走真实 scrollTo
      window.scrollTo(0, 300)
      window.dispatchEvent(new Event('scroll'))
      await new Promise((r) => setTimeout(r, 60))
      await nextTick()
    }
  }

  async function mountBacktop(props, slots) {
    wrapper = mount(UcBacktop, { props, slots, attachTo: document.body })
    // antd 初始绑定在 onMounted + nextTick + rAF
    await nextTick()
    await new Promise((r) => setTimeout(r, 60))
    return wrapper
  }

  afterEach(() => {
    wrapper?.unmount()
    // eslint-disable-next-line no-undef
    try {
      delete document.documentElement.scrollTop
    } catch (e) {
      /* noop */
    }
    window.scrollTo(0, 0)
    vi.restoreAllMocks()
  })

  describe(`UcBacktop 契约 [${libName}]`, () => {
    it('初始未达阈值不显示', async () => {
      await mountBacktop()
      if (isElement) {
        expect(wrapper.find(btnSel).exists()).toBe(false)
      } else {
        expect(wrapper.find(btnSel).exists()).toBe(true)
        expect(wrapper.find(btnSel).isVisible()).toBe(false)
      }
    })

    it('滚动超过 visibilityHeight 后显示', async () => {
      await mountBacktop()
      await showBacktop()
      if (isElement) {
        expect(wrapper.find(btnSel).exists()).toBe(true)
      } else {
        expect(wrapper.find(btnSel).isVisible()).toBe(true)
      }
    })

    it('显示时带 right/bottom 固定定位样式', async () => {
      await mountBacktop()
      await showBacktop()
      const style = wrapper.find(btnSel).attributes('style') || ''
      expect(style).toContain('right: 40px')
      expect(style).toContain('bottom: 40px')
    })

    it('点击回到顶部并抛出 click 事件', async () => {
      if (isElement) {
        // happy-dom 下避免真实滚动调用，只验证事件
        if (typeof document.documentElement.scrollTo === 'function') {
          vi.spyOn(document.documentElement, 'scrollTo').mockImplementation(() => {})
        }
      }
      await mountBacktop()
      await showBacktop()
      await wrapper.find(btnSel).trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(Event)
    })

    it('默认插槽自定义内容渲染在按钮内', async () => {
      await mountBacktop(undefined, { default: () => 'TOP' })
      await showBacktop()
      expect(wrapper.find(btnSel).text()).toContain('TOP')
    })

    it('class 逃生舱透传（element 经外层包裹节点，antd 落按钮）', async () => {
      wrapper = mount(UcBacktop, {
        attrs: { class: 'my-backtop' },
        attachTo: document.body,
      })
      await nextTick()
      await new Promise((r) => setTimeout(r, 60))
      await showBacktop()
      // element 根是 Transition 不转发 attrs，class 落在包裹节点；antd 落在按钮
      if (isElement) {
        expect(wrapper.find('.my-backtop').exists()).toBe(true)
      } else {
        expect(wrapper.find(btnSel).classes()).toContain('my-backtop')
      }
    })
  })
}
