import { defineComponent, h, ref, computed, provide, shallowRef } from 'vue'
import { ensureSplitterStyle } from './native-styles'

// UcSplitter（antd 原生兜底实现）
// ant-design-vue 4.2.6 无 Splitter 组件，这里用 flex 布局 + 原生鼠标/触摸拖拽实现，
// API 与 element 侧 UcSplitter 对齐：
//   layout(horizontal|vertical) / lazy + @resize-start/@resize/@resize-end(index, sizes) /
//   @collapse(index, type: 'start'|'end', sizes)
// 面板通过 provide/inject 注册（同 antd Layout-Sider 模式，穿透包装层天然成立）
export const UcSplitterContextKey = Symbol('ucSplitter')

ensureSplitterStyle()

const parseSize = (v, total) => {
  if (v == null || v === '') return null
  if (typeof v === 'number') return v
  if (v.endsWith('%')) return (Number(v.slice(0, -1)) / 100) * total
  if (v.endsWith('px')) return Number(v.slice(0, -2))
  const n = Number(v)
  return Number.isNaN(n) ? null : n
}

const isCollapsibleOn = (entry, dir) => {
  const c = entry?.props?.collapsible
  if (!c) return false
  return typeof c === 'object' ? !!c[dir] : !!c
}

export default defineComponent({
  name: 'UcSplitter',
  inheritAttrs: false,
  props: {
    layout: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    lazy: Boolean,
  },
  emits: ['resize-start', 'resize', 'resize-end', 'collapse'],
  setup(props, { emit, slots, attrs }) {
    const containerEl = ref(null)
    const panels = shallowRef([])
    const pxSizes = ref([])
    const movingIndex = ref(-1)
    const ghostIndex = ref(-1)
    const ghostOffset = ref(0)
    const collapsedMemory = new Map()
    let dragState = null

    const isHorizontal = computed(() => props.layout === 'horizontal')
    const panelCount = computed(() => panels.value.length)

    const containerSize = () => {
      const rect = containerEl.value?.getBoundingClientRect?.()
      if (!rect) return 0
      return isHorizontal.value ? rect.width : rect.height
    }
    const entrySize = (entry) => {
      const rect = entry?.el?.getBoundingClientRect?.()
      if (!rect) return 0
      return isHorizontal.value ? rect.width : rect.height
    }

    const assignIndices = (list) => list.forEach((entry, index) => (entry.index = index))
    const registerPanel = (entry) => {
      panels.value = [...panels.value, entry]
      assignIndices(panels.value)
    }
    const unregisterPanel = (entry) => {
      panels.value = panels.value.filter((item) => item !== entry)
      assignIndices(panels.value)
    }

    const isBarResizable = (index) => {
      const first = panels.value[index]
      const second = panels.value[index + 1]
      if (!first || !second) return false
      if (!first.props.resizable || !second.props.resizable) return false
      // 已折叠且声明了 min 的一侧不可拖开（与 element 判定一致）
      if (pxSizes.value[index] === 0 && first.props.min != null) return false
      if (pxSizes.value[index + 1] === 0 && second.props.min != null) return false
      return true
    }
    const isStartCollapsible = (index) => isCollapsibleOn(panels.value[index], 'start')
    const isEndCollapsible = (index) => isCollapsibleOn(panels.value[index + 1], 'end')

    const collectSizes = () => panels.value.map((entry) => entrySize(entry))

    const moveStart = (index, pageX, pageY) => {
      const total = containerSize()
      const a = entrySize(panels.value[index])
      const b = entrySize(panels.value[index + 1])
      dragState = {
        index,
        start: isHorizontal.value ? pageX : pageY,
        a,
        b,
        minA: parseSize(panels.value[index]?.props.min, total) || 0,
        maxA: parseSize(panels.value[index]?.props.max, total) || Infinity,
        minB: parseSize(panels.value[index + 1]?.props.min, total) || 0,
        maxB: parseSize(panels.value[index + 1]?.props.max, total) || Infinity,
      }
      movingIndex.value = index
      ghostIndex.value = index
      ghostOffset.value = 0
      pxSizes.value = collectSizes()
      emit('resize-start', index, pxSizes.value.slice())
    }

    const moving = (index, pageX, pageY) => {
      if (!dragState || dragState.index !== index) return
      let delta = (isHorizontal.value ? pageX : pageY) - dragState.start
      let na = dragState.a + delta
      let nb = dragState.b - delta
      // 双侧 min/max 夹取：夹一侧后把空间还给另一侧
      if (na < dragState.minA) {
        na = dragState.minA
        nb = dragState.a + dragState.b - na
      }
      if (nb < dragState.minB) {
        nb = dragState.minB
        na = dragState.a + dragState.b - nb
      }
      if (na > dragState.maxA) {
        na = dragState.maxA
        nb = dragState.a + dragState.b - na
      }
      if (nb > dragState.maxB) {
        nb = dragState.maxB
        na = dragState.a + dragState.b - nb
      }
      if (props.lazy) {
        // lazy：拖拽中只移动幽灵指示条，不改尺寸、不发 resize（与 element 一致）
        ghostOffset.value = na - dragState.a
      } else {
        pxSizes.value = pxSizes.value.slice()
        pxSizes.value[index] = na
        pxSizes.value[index + 1] = nb
        emit('resize', index, pxSizes.value.slice())
      }
    }

    const moveEnd = (index) => {
      if (props.lazy && dragState) {
        const offset = ghostOffset.value
        pxSizes.value = pxSizes.value.slice()
        pxSizes.value[index] = dragState.a + offset
        pxSizes.value[index + 1] = dragState.b - offset
      }
      dragState = null
      movingIndex.value = -1
      ghostIndex.value = -1
      ghostOffset.value = 0
      emit('resize-end', index, pxSizes.value.slice())
    }

    // 拖拽条 mousedown：window 级监听 move/up（与 element split-bar 同模型）
    const onDraggerMousedown = (index, event) => {
      if (!isBarResizable(index)) return
      // 优先 clientX/clientY：happy-dom 的 MouseEvent 构造参数只写 client*，
      // 且 pageX 默认 0，用 ?? 会错误短路
      const page = (e) => [e.clientX ?? e.pageX ?? 0, e.clientY ?? e.pageY ?? 0]
      const [startX, startY] = page(event)
      moveStart(index, startX, startY)
      const onMove = (e) => {
        const [x, y] = page(e)
        moving(index, x, y)
      }
      const onUp = () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
        moveEnd(index)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    }

    // 折叠语义与 element useResize.onCollapse 完全对齐：
    // end：折叠 index+1，其空间并入 index；start 反之。再次触发按缓存恢复。
    const collapse = (index, type) => {
      const total = containerSize()
      if (pxSizes.value.length === 0) pxSizes.value = collectSizes()
      const sizes = pxSizes.value.slice()
      const currentIndex = type === 'start' ? index : index + 1
      const targetIndex = type === 'start' ? index + 1 : index
      const currentSize = sizes[currentIndex] || 0
      const targetSize = sizes[targetIndex] || 0
      if (currentSize !== 0 && targetSize !== 0) {
        collapsedMemory.set(index, currentSize)
        sizes[currentIndex] = 0
        sizes[targetIndex] = targetSize + currentSize
      } else if (currentSize === 0) {
        const restoreMax = currentSize + targetSize
        const fallback =
          parseSize(panels.value[currentIndex]?.props.size, total) || 100
        const restore = Math.min(
          Math.max(collapsedMemory.get(index) ?? fallback, 0),
          restoreMax,
        )
        sizes[currentIndex] = restore
        sizes[targetIndex] = restoreMax - restore
      }
      pxSizes.value = sizes
      emit('collapse', index, type, sizes.slice())
    }

    provide(
      UcSplitterContextKey,
      Object.assign(
        {
          registerPanel,
          unregisterPanel,
          isBarResizable,
          isStartCollapsible,
          isEndCollapsible,
          onDraggerMousedown,
          collapse,
        },
        // 响应式状态以 ref 形式下发，面板直接消费
        {
          layout: isHorizontal,
          lazy: computed(() => props.lazy),
          panelCount,
          pxSizes,
          movingIndex,
          ghostIndex,
          ghostOffset,
        },
      ),
    )

    return () => {
      const { class: userClass, style: userStyle, ...restAttrs } = attrs
      return h(
        'div',
        {
          ref: containerEl,
          class: [
            'uc-splitter',
            `uc-splitter__${props.layout}`,
            { 'uc-splitter--moving': movingIndex.value !== -1 },
            userClass,
          ],
          style: userStyle,
          ...restAttrs,
        },
        [
          slots.default?.(),
          movingIndex.value !== -1
            ? h('div', {
                class: ['uc-splitter__mask', `uc-splitter__mask-${props.layout}`],
              })
            : null,
        ],
      )
    }
  },
})
