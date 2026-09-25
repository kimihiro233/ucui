import { defineComponent, h, ref, computed } from 'vue'
import { ElScrollbar } from 'element-plus'

// UcScrollbar：自定义滚动条容器
// 统一 API：height/maxHeight(number|string，number 自动补 px) / native(使用原生滚动条) /
//   always(常驻显示) / minSize(滚动条最小尺寸) / tag(视图标签) / distance(end-reached 触发距离) /
//   wrapStyle/wrapClass/viewStyle/viewClass + @scroll({scrollTop,scrollLeft}) / @end-reached(direction)
// expose：wrapRef / scrollTo / setScrollTop / setScrollLeft / update
// element 侧 addUnit 原生支持 number，直接透传
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
    const innerRef = ref(null)
    const wrapRef = computed(() => innerRef.value?.wrapRef)

    // 透传底层命令式方法
    expose({
      wrapRef,
      update: (...args) => innerRef.value?.update?.(...args),
      handleScroll: (...args) => innerRef.value?.handleScroll?.(...args),
      scrollTo: (...args) => innerRef.value?.scrollTo?.(...args),
      setScrollTop: (v) => innerRef.value?.setScrollTop?.(v),
      setScrollLeft: (v) => innerRef.value?.setScrollLeft?.(v),
    })

    return () =>
      h(
        ElScrollbar,
        {
          ref: innerRef,
          height: props.height,
          maxHeight: props.maxHeight,
          native: props.native,
          always: props.always,
          minSize: props.minSize,
          tag: props.tag,
          distance: props.distance,
          noresize: props.noresize,
          wrapStyle: props.wrapStyle,
          wrapClass: props.wrapClass,
          viewClass: props.viewClass,
          viewStyle: props.viewStyle,
          ...attrs,
          onScroll: (payload) => emit('scroll', payload),
          onEndReached: (direction) => emit('end-reached', direction),
        },
        slots,
      )
  },
})
