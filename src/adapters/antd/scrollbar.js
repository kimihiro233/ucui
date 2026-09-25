import { defineComponent, h, ref } from 'vue'
import { ensureScrollbarStyle } from './native-styles'

// UcScrollbar（antd 原生兜底实现）
// ant-design-vue 4.2.6 无 Scrollbar 组件，这里用原生滚动容器 + 细滚动条样式实现，
// API 与 element 侧 UcScrollbar 对齐：
//   height/maxHeight(number|string) / native / always / minSize / tag / distance /
//   wrapStyle/wrapClass/viewStyle/viewClass + @scroll / @end-reached
// expose：wrapRef / scrollTo / setScrollTop / setScrollLeft / update(空操作)
const addUnit = (v) => (typeof v === 'number' ? `${v}px` : v)

ensureScrollbarStyle()

export default defineComponent({
  name: 'UcScrollbar',
  inheritAttrs: false,
  props: {
    height: { type: [String, Number], default: '' },
    maxHeight: { type: [String, Number], default: '' },
    native: Boolean,
    always: Boolean,
    minSize: { type: Number, default: 20 },
    tag: { type: String, default: 'div' },
    distance: { type: Number, default: 0 },
    noresize: Boolean,
    wrapStyle: { type: [String, Object, Array], default: '' },
    wrapClass: { type: [String, Array, Object], default: '' },
    viewClass: { type: [String, Array, Object], default: '' },
    viewStyle: { type: [String, Object, Array], default: '' },
  },
  emits: ['scroll', 'end-reached'],
  setup(props, { emit, slots, attrs, expose }) {
    const wrapRef = ref(null)

    const onScroll = () => {
      const el = wrapRef.value
      if (!el) return
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = el
      emit('scroll', { scrollTop, scrollLeft })
      if (props.distance <= 0) return
      if (scrollTop <= props.distance) emit('end-reached', 'top')
      if (scrollLeft <= props.distance) emit('end-reached', 'left')
      if (scrollHeight - clientHeight - scrollTop <= props.distance) emit('end-reached', 'bottom')
      if (scrollWidth - clientWidth - scrollLeft <= props.distance) emit('end-reached', 'right')
    }

    const scrollTo = (arg1, arg2) => {
      const el = wrapRef.value
      if (!el) return
      if (typeof arg1 === 'object') {
        if (typeof el.scrollTo === 'function') el.scrollTo(arg1)
        else {
          el.scrollTop = arg1.top ?? 0
          el.scrollLeft = arg1.left ?? 0
        }
      } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        if (typeof el.scrollTo === 'function') el.scrollTo(arg1, arg2)
        else {
          el.scrollTop = arg1
          el.scrollLeft = arg2
        }
      }
    }
    const setScrollTop = (value) => {
      if (typeof value !== 'number' || !wrapRef.value) return
      wrapRef.value.scrollTop = value
    }
    const setScrollLeft = (value) => {
      if (typeof value !== 'number' || !wrapRef.value) return
      wrapRef.value.scrollLeft = value
    }

    expose({ wrapRef, scrollTo, setScrollTop, setScrollLeft, update: () => {}, handleScroll: onScroll })

    return () => {
      const { class: userClass, style: userStyle, tabindex, id, role, ...restAttrs } = attrs
      const wrapSizeStyle = {}
      if (props.height !== '' && props.height != null) wrapSizeStyle.height = addUnit(props.height)
      if (props.maxHeight !== '' && props.maxHeight != null)
        wrapSizeStyle.maxHeight = addUnit(props.maxHeight)

      return h(
        'div',
        {
          class: ['uc-scrollbar', { 'uc-scrollbar--always': props.always && !props.native }, userClass],
          style: userStyle,
          ...restAttrs,
        },
        [
          h(
            'div',
            {
              ref: wrapRef,
              class: [
                'uc-scrollbar__wrap',
                props.wrapClass,
                { 'uc-scrollbar__wrap--hidden-default': !props.native },
                { 'uc-scrollbar__wrap--always': props.always },
              ],
              style: [props.wrapStyle, wrapSizeStyle],
              tabindex,
              onScroll,
            },
            [
              h(
                props.tag,
                { class: ['uc-scrollbar__view', props.viewClass], style: props.viewStyle, id, role },
                slots.default?.(),
              ),
            ],
          ),
        ],
      )
    }
  },
})
