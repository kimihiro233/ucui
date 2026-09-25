import { defineComponent, h } from 'vue'
import { ElImage } from 'element-plus'

// UcImage：图片
// 统一 API：src/alt/width/height/fit(contain|cover|fill|none|scale-down)/preview + @error
// element 的 alt/width/height 未在 ElImage props 声明，经其内部 attrs 拆分落到 img 元素
// preview=true 时映射为 previewSrcList=[src] 开启点击放大
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
    return () =>
      h(
        ElImage,
        {
          src: props.src,
          fit: props.fit,
          alt: props.alt,
          width: props.width,
          height: props.height,
          previewSrcList: props.preview ? [props.src] : [],
          previewTeleported: props.preview ? true : undefined,
          ...attrs,
          onError: (event) => emit('error', event),
        },
        slots,
      )
  },
})
