import { defineComponent, h } from 'vue'
import { Image } from 'ant-design-vue'

// UcImage：图片
// 统一 API：src/alt/width/height/fit(contain|cover|fill|none|scale-down)/preview + @error
// antd 的 preview 默认 true，统一层默认 false，故必须显式传 preview
// fit 无独立 prop，通过 img 的 style.objectFit 映射
export default defineComponent({
  name: 'UcImage',
  inheritAttrs: false,
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined },
    fit: {
      type: String,
      default: '',
      validator: (v) => ['', 'contain', 'cover', 'fill', 'none', 'scale-down'].includes(v),
    },
    preview: { type: Boolean, default: false },
  },
  emits: ['error'],
  setup(props, { emit, slots, attrs }) {
    return () => {
      // style 已合并 fit 的 objectFit，需从逃生舱中剔除避免覆盖
      const { style: userStyle, ...restAttrs } = attrs
      return h(
        Image,
        {
          src: props.src,
          alt: props.alt,
          width: props.width,
          height: props.height,
          preview: props.preview,
          style: [props.fit ? { objectFit: props.fit } : {}, userStyle],
          ...restAttrs,
          onError: (event) => emit('error', event),
        },
        slots,
      )
    }
  },
})
