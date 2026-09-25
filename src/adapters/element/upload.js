import { defineComponent, h } from 'vue'
import { ElUpload } from 'element-plus'

export default defineComponent({
  name: 'UcUpload',
  inheritAttrs: false,
  props: {
    // 文件列表 [{ name, url?, status? }]，v-model 绑定
    modelValue: { type: Array, default: () => [] },
    action: { type: String, default: '#' },
    name: { type: String, default: 'file' },
    multiple: Boolean,
    accept: String,
    disabled: Boolean,
    limit: Number,
    autoUpload: { type: Boolean, default: true },
    listType: { type: String, default: 'text' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(ElUpload, {
        fileList: props.modelValue,
        action: props.action,
        name: props.name,
        multiple: props.multiple,
        accept: props.accept,
        disabled: props.disabled,
        limit: props.limit,
        autoUpload: props.autoUpload,
        listType: props.listType,
        ...attrs,
        // element onChange(uploadFile, uploadFiles)
        onChange: (file, files) => {
          emit('update:modelValue', files)
          emit('change', file, files)
        },
      }, slots)
  },
})
