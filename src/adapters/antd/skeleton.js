import { defineComponent, h } from 'vue'
import { Skeleton } from 'ant-design-vue'

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
        Skeleton,
        {
          loading: props.loading,
          active: props.active,
          // antd 行数挂在 paragraph.rows 上
          paragraph: { rows: props.rows },
          ...attrs,
        },
        slots,
      )
  },
})
