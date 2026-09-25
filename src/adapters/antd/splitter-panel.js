import { defineComponent, h, ref, inject, computed, getCurrentInstance, watch, onBeforeUnmount } from 'vue'
import { UcSplitterContextKey } from './splitter'

// UcSplitterPanel（antd 原生兜底实现）
// API 与 element 侧对齐：size/min/max(px 字符串|%字符串|number) / resizable /
//   collapsible(boolean | {start,end}) + @update:size(px)
// 面板渲染 .uc-splitter-panel，并在非末项后渲染拖拽条（与 element 结构对齐）
export default defineComponent({
  name: 'UcSplitterPanel',
  inheritAttrs: false,
  props: {
    size: { type: [String, Number], default: undefined },
    min: { type: [String, Number], default: undefined },
    max: { type: [String, Number], default: undefined },
    resizable: { type: Boolean, default: true },
    collapsible: { type: [Boolean, Object], default: false },
  },
  emits: ['update:size'],
  setup(props, { emit, slots, attrs }) {
    const ctx = inject(UcSplitterContextKey, null)
    if (!ctx) {
      throw new Error('[UcSplitterPanel] usage: <UcSplitter><UcSplitterPanel /></UcSplitter>')
    }
    const panelEl = ref(null)
    const index = ref(-1)
    const uid = getCurrentInstance().uid
    const entry = {
      uid,
      props,
      get el() {
        return panelEl.value
      },
      set index(v) {
        index.value = v
      },
      get index() {
        return index.value
      },
    }
    ctx.registerPanel(entry)
    onBeforeUnmount(() => ctx.unregisterPanel(entry))

    const showBar = computed(() => index.value >= 0 && index.value < ctx.panelCount.value - 1)
    const barResizable = computed(() => ctx.isBarResizable(index.value))
    const startCollapsible = computed(() => ctx.isStartCollapsible(index.value))
    const endCollapsible = computed(() => ctx.isEndCollapsible(index.value))
    const isHorizontal = ctx.layout // computed(boolean)
    const isMoving = computed(() => ctx.movingIndex.value === index.value)

    // 初始 flex：未指定尺寸的面板均分剩余空间
    const baseFlex = computed(() => {
      const s = props.size
      if (s == null || s === '') return '1 1 0%'
      if (typeof s === 'number') return `0 0 ${s}px`
      return `0 0 ${s}` // '120px' 或 '30%'
    })
    const panelFlex = computed(() => {
      const px = ctx.pxSizes.value[index.value]
      return px == null ? baseFlex.value : `0 0 ${px}px`
    })

    // 拖拽后归一化通知 update:size
    watch(
      () => ctx.pxSizes.value[index.value],
      (val, old) => {
        if (val != null && val !== old) emit('update:size', val)
      },
    )

    const arrowChar = (dir) => {
      if (dir === 'start') return isHorizontal.value ? '\u2039' : '\u02C4'
      return isHorizontal.value ? '\u203A' : '\u02C5'
    }

    const renderBar = () => {
      if (!showBar.value) return null
      const layout = isHorizontal.value ? 'horizontal' : 'vertical'
      const ghost =
        ctx.ghostIndex.value === index.value && ctx.ghostOffset.value
          ? { transform: `translate${isHorizontal.value ? 'X' : 'Y'}(${ctx.ghostOffset.value}px)` }
          : null
      const startSlot = slots['start-collapsible']
      const endSlot = slots['end-collapsible']
      return h('div', { class: 'uc-splitter-bar', style: { [isHorizontal.value ? 'width' : 'height']: '0' } }, [
        startCollapsible.value
          ? h(
              'div',
              {
                class: [
                  'uc-splitter-bar__collapse-icon',
                  `uc-splitter-bar__${layout}-collapse-icon-start`,
                ],
                onClick: () => ctx.collapse(index.value, 'start'),
              },
              startSlot ? startSlot() : arrowChar('start'),
            )
          : null,
        h('div', {
          class: [
            'uc-splitter-bar__dragger',
            `uc-splitter-bar__dragger-${layout}`,
            {
              'is-disabled': !barResizable.value,
              'is-lazy': barResizable.value && ctx.lazy.value,
              'is-active': isMoving.value,
            },
          ],
          style: ghost,
          onMousedown: (e) => ctx.onDraggerMousedown(index.value, e),
        }),
        endCollapsible.value
          ? h(
              'div',
              {
                class: [
                  'uc-splitter-bar__collapse-icon',
                  `uc-splitter-bar__${layout}-collapse-icon-end`,
                ],
                onClick: () => ctx.collapse(index.value, 'end'),
              },
              endSlot ? endSlot() : arrowChar('end'),
            )
          : null,
      ])
    }

    return () => {
      // class/style 必须显式合并：attrs 展开在同名 key 之后会整体覆盖基础类
      const { class: extraClass, style: extraStyle, ...restAttrs } = attrs
      return [
        h(
          'div',
          {
            ref: panelEl,
            class: ['uc-splitter-panel', extraClass],
            style: [{ flex: panelFlex.value }, extraStyle],
            ...restAttrs,
          },
          slots.default?.(),
        ),
        renderBar(),
      ]
    }
  },
})
