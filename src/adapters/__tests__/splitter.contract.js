import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

// UcSplitter 统一契约
// element 侧包 ElSplitter；antd 侧为原生 flex + 拖拽兜底（.uc-splitter 结构）
// layout(horizontal|vertical) / lazy
// @resize-start/@resize/@resize-end(index, pxSizes) / @collapse(index, 'start'|'end', pxSizes)
// 注意：element 的面板索引在 watch(panels) 中 setIndex，挂载后需 nextTick 才渲染拖拽条；
// antd 兜底面板注册后同样需要一次 flush，故所有拖拽条相关断言前先 await nextTick。
export function splitterContract(libName, UcSplitter, UcSplitterPanel) {
  const isElement = libName === 'element-plus'
  const rootSelector = isElement ? '.el-splitter' : '.uc-splitter'
  const panelSelector = isElement ? '.el-splitter-panel' : '.uc-splitter-panel'
  const barSelector = isElement ? '.el-splitter-bar' : '.uc-splitter-bar'
  const draggerSelector = isElement
    ? '.el-splitter-bar__dragger'
    : '.uc-splitter-bar__dragger'
  const iconSelector = isElement
    ? '.el-splitter-bar__collapse-icon'
    : '.uc-splitter-bar__collapse-icon'

  const mountSplitter = (props = {}, panelPropsList = [{}, {}]) =>
    mount(UcSplitter, {
      props,
      slots: {
        default: () =>
          panelPropsList.map((p, i) =>
            h(UcSplitterPanel, p, { default: () => `面板${i + 1}` }),
          ),
      },
    })

  const mockRect = (wrapper, width, height = 300) => {
    const panels = wrapper.findAll(panelSelector)
    const rect = {
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON() {},
    }
    panels.forEach((p) => vi.spyOn(p.element, 'getBoundingClientRect').mockReturnValue(rect))
  }

  // element 的容器尺寸来自 @vueuse useElementSize → ResizeObserver，
  // happy-dom 不派发 RO 回调，stub 一个挂载即回报 400x300 的实现
  const stubContainerSize = (width = 400, height = 300) => {
    if (!isElement) return
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback) {
          this.callback = callback
        }
        observe(target) {
          this.callback(
            [
              {
                target,
                contentRect: { width, height, top: 0, left: 0, right: width, bottom: height },
              },
            ],
            this,
          )
        }
        unobserve() {}
        disconnect() {}
      },
    )
  }

  afterEach(() => vi.unstubAllGlobals())

  describe(`UcSplitter 契约 [${libName}]`, () => {
    it('渲染根容器与 horizontal 布局类', () => {
      const wrapper = mountSplitter()
      const root = wrapper.find(rootSelector)
      expect(root.exists()).toBe(true)
      expect(root.classes()).toContain(`${rootSelector.slice(1)}__horizontal`)
    })

    it('vertical 布局类', () => {
      const wrapper = mountSplitter({ layout: 'vertical' })
      expect(wrapper.find(rootSelector).classes()).toContain(
        `${rootSelector.slice(1)}__vertical`,
      )
    })

    it('渲染所有面板内容', () => {
      const wrapper = mountSplitter()
      const panels = wrapper.findAll(panelSelector)
      expect(panels).toHaveLength(2)
      expect(panels[0].text()).toBe('面板1')
      expect(panels[1].text()).toBe('面板2')
    })

    it('N 个面板渲染 N-1 个拖拽条（3 面板 → 2 条）', async () => {
      const wrapper = mountSplitter({}, [{}, {}, {}])
      await nextTick()
      expect(wrapper.findAll(barSelector)).toHaveLength(2)
    })

    it('相邻面板均 resizable 时拖拽条可拖（无 is-disabled）', async () => {
      const wrapper = mountSplitter()
      await nextTick()
      expect(wrapper.find(draggerSelector).classes()).not.toContain('is-disabled')
    })

    it('相邻面板均 resizable=false 时拖拽条 is-disabled', async () => {
      const wrapper = mountSplitter({}, [{ resizable: false }, { resizable: false }])
      await nextTick()
      expect(wrapper.find(draggerSelector).classes()).toContain('is-disabled')
    })

    it('lazy 时拖拽条带 is-lazy 类', async () => {
      const wrapper = mountSplitter({ lazy: true })
      await nextTick()
      expect(wrapper.find(draggerSelector).classes()).toContain('is-lazy')
    })

    it('collapsible 面板渲染开始/结束两个折叠触发器', async () => {
      // element 折叠图标显示要求两侧面板 pxSize>0（isCollapsible 带 size>0 条件），
      // happy-dom 无真实布局，需在挂载前 stub ResizeObserver 回报容器宽度
      stubContainerSize()
      const wrapper = mountSplitter({}, [{ collapsible: true }, { collapsible: true }])
      await nextTick()
      const icons = wrapper.findAll(iconSelector)
      expect(icons).toHaveLength(2)
      expect(icons[0].classes().some((c) => c.endsWith('collapse-icon-start'))).toBe(true)
      expect(icons[1].classes().some((c) => c.endsWith('collapse-icon-end'))).toBe(true)
    })

    it('resize-start/resize/resize-end 事件归一化为 (index, sizes)', async () => {
      const wrapper = mountSplitter()
      if (isElement) {
        // element 走声明式 emits
        const inner = wrapper.findComponent({ name: 'ElSplitter' })
        inner.vm.$emit('resizeStart', 0, [200, 300])
        inner.vm.$emit('resize', 0, [240, 260])
        inner.vm.$emit('resizeEnd', 0, [240, 260])
      } else {
        // antd 兜底：真实 mousedown + window mousemove/mouseup
        // a=b=200，delta=+40 → na=240, nb=160（空间守恒）
        await nextTick()
        mockRect(wrapper, 200)
        wrapper.find(draggerSelector).element.dispatchEvent(
          new MouseEvent('mousedown', { bubbles: true, clientX: 100, clientY: 0 }),
        )
        window.dispatchEvent(
          new MouseEvent('mousemove', { bubbles: true, clientX: 140, clientY: 0 }),
        )
        window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
      }
      expect(wrapper.emitted('resize-start')[0]).toEqual([
        0,
        isElement ? [200, 300] : [200, 200],
      ])
      expect(wrapper.emitted('resize').at(-1)).toEqual([
        0,
        isElement ? [240, 260] : [240, 160],
      ])
      expect(wrapper.emitted('resize-end')[0]).toEqual([
        0,
        isElement ? [240, 260] : [240, 160],
      ])
    })

    it('collapse 事件归一化为 (index, type, sizes)', async () => {
      const wrapper = mountSplitter({}, [
        { collapsible: true, size: '100px' },
        { collapsible: true, size: '100px' },
      ])
      if (isElement) {
        wrapper
          .findComponent({ name: 'ElSplitter' })
          .vm.$emit('collapse', 0, 'end', [0, 500])
      } else {
        // antd 兜底：happy-dom 无真实布局，需 mock 面板尺寸 100x300
        await nextTick()
        mockRect(wrapper, 100)
        await wrapper.findAll(iconSelector)[1].trigger('click')
      }
      const event = wrapper.emitted('collapse')[0]
      expect(event[0]).toBe(0)
      expect(event[1]).toBe('end')
      // antd 兜底与 element onCollapse 同语义：第二面板折叠为 0，100px 并入第一面板
      expect(event[2]).toEqual(isElement ? [0, 500] : [200, 0])
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mountSplitter({ class: 'my-splitter' })
      expect(wrapper.html()).toContain('my-splitter')
    })
  })
}
