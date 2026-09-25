import { defineComponent, h } from 'vue'
import { ElSkeleton } from 'element-plus'

export default defineComponent({
  name: 'UcSkeleton',
  inheritAttrs: false,
  props: {
    loading: { type: Boolean, default: true },
    active: Boolean,
    rows: { type: Number, default: 3 },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElSkeleton,
        {
          loading: props.loading,
          // element 用 animated
          animated: props.active,
          rows: props.rows,
          ...attrs,
        },
        slots,
      )
  },
})
