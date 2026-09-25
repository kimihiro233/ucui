import { defineComponent, h } from 'vue'
import { Upload } from 'ant-design-vue'

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
      h(Upload, {
        fileList: props.modelValue,
        action: props.action,
        name: props.name,
        multiple: props.multiple,
        accept: props.accept,
        disabled: props.disabled,
        // antd 无 limit/autoUpload，行为差异由业务侧自行处理（逃生舱透传也不生效）
        listType: props.listType,
        ...attrs,
        'onUpdate:fileList': (files) => emit('update:modelValue', files),
        // antd onChange(info: { file, fileList })
        onChange: (info) => emit('change', info.file, info.fileList),
      }, slots)
  },
})
