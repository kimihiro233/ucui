import { defineComponent, h, ref, watch } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'

// UcCarousel 统一层：
// v-model=当前帧索引；items=[{key}]，帧内容走具名插槽（插槽名=key）
// element 用 ElCarousel + ElCarouselItem 子组件模式
// element 无受控 current prop（只有 initialIndex），外部 v-model 变化靠 ref.setActiveItem 同步
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
    // always | hover | never
    arrow: { type: String, default: 'hover' },
    dots: { type: Boolean, default: true },
    // horizontal | vertical
    direction: { type: String, default: 'horizontal' },
    loop: { type: Boolean, default: true },
    pauseOnHover: { type: Boolean, default: true },
    // hover | click（仅 element 指示器触发方式）
    trigger: { type: String, default: 'hover' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    const carouselRef = ref()
    const innerCurrent = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerCurrent.value) {
          innerCurrent.value = val
          carouselRef.value?.setActiveItem(val)
        }
      },
    )

    // element change(current, prev)，直接归一化
    const handleChange = (current, prev) => {
      innerCurrent.value = current
      emit('update:modelValue', current)
      emit('change', current, prev)
    }

    return () =>
      h(
        ElCarousel,
        {
          ref: carouselRef,
          initialIndex: props.modelValue,
          height: props.height || undefined,
          autoplay: props.autoplay,
          interval: props.interval,
          arrow: props.arrow,
          indicatorPosition: props.dots ? '' : 'none',
          direction: props.direction,
          loop: props.loop,
          pauseOnHover: props.pauseOnHover,
          trigger: props.trigger,
          ...attrs,
          onChange: handleChange,
        },
        () =>
          props.items.map((item) =>
            h(
              ElCarouselItem,
              { key: item.key, name: String(item.key) },
              slots[item.key] ? { default: slots[item.key] } : undefined,
            ),
          ),
      )
  },
})
