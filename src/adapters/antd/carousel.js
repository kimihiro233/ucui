import { defineComponent, h, ref, watch } from 'vue'
import { Carousel } from 'ant-design-vue'

// UcCarousel 统一层：
// v-model=当前帧索引；items=[{key}]，帧内容走具名插槽（插槽名=key）
// antd Carousel 无子组件，直接给 div 子节点；无受控 current（只有 initialSlide），
// 外部 v-model 变化靠 ref.goTo 同步；afterChange 只有 current，prev 由适配器维护
export default defineComponent({
  name: 'UcCarousel',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 0 },
    items: {
      type: Array,
      default: () => [],
      validator: (v) =>
        v.every((i) => i && (typeof i.key === 'string' || typeof i.key === 'number')),
    },
    height: { type: String, default: '' },
    autoplay: { type: Boolean, default: true },
    interval: { type: Number, default: 3000 },
    // always | hover | never（antd 仅支持 显隐 二态，hover 等同不显示箭头）
    arrow: { type: String, default: 'hover' },
    dots: { type: Boolean, default: true },
    // horizontal | vertical
    direction: { type: String, default: 'horizontal' },
    loop: { type: Boolean, default: true },
    pauseOnHover: { type: Boolean, default: true },
    // hover | click（antd 无此能力，声明仅为 API 对齐）
    trigger: { type: String, default: 'hover' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    const carouselRef = ref()
    const innerCurrent = ref(props.modelValue)
    const prevIndex = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerCurrent.value) {
          prevIndex.value = innerCurrent.value
          innerCurrent.value = val
          // dontAnimate=true 规避 happy-dom 下过渡不可靠
          carouselRef.value?.goTo(val, true)
        }
      },
    )

    const handleAfterChange = (current) => {
      emit('update:modelValue', current)
      emit('change', current, prevIndex.value)
      prevIndex.value = current
      innerCurrent.value = current
    }

    return () =>
      h(
        Carousel,
        {
          ref: carouselRef,
          initialSlide: props.modelValue,
          autoplay: props.autoplay,
          autoplaySpeed: props.interval,
          arrows: props.arrow === 'always',
          dots: props.dots,
          infinite: props.loop,
          pauseOnHover: props.pauseOnHover,
          dotPosition: props.direction === 'vertical' ? 'right' : 'bottom',
          verticalSwiping: props.direction === 'vertical',
          ...attrs,
          afterChange: handleAfterChange,
        },
        () =>
          props.items.map((item) =>
            h('div', { key: item.key }, slots[item.key] ? slots[item.key]() : []),
          ),
      )
  },
})
