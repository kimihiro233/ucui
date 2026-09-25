import { defineComponent, h, ref } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'

// UcMenu：导航菜单
// 统一 API：
//   v-model(选中 key) / mode(horizontal|vertical) /
//   items=[{key,label,disabled?,children?}] 数据驱动 /
//   defaultOpeneds(初始展开) / uniqueOpened / trigger(hover|click) / collapse +
//   @select(key,keyPath) @open-change(keys)
// element 用 ElMenuItem/ElSubMenu 子组件递归渲染，defaultActive 受控
export default defineComponent({
  name: 'UcMenu',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    mode: {
      type: String,
      default: 'vertical',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    items: { type: Array, default: () => [] },
    defaultOpeneds: { type: Array, default: () => [] },
    uniqueOpened: Boolean,
    trigger: {
      type: String,
      default: 'hover',
      validator: (v) => ['hover', 'click'].includes(v),
    },
    collapse: Boolean,
  },
  emits: ['update:modelValue', 'select', 'open-change'],
  setup(props, { emit, attrs }) {
    // 跟踪当前展开的子菜单 key，用于归一化 open-change 事件
    const openKeys = ref([...props.defaultOpeneds])

    const renderItems = (list) =>
      list.map((item) => {
        if (item.children && item.children.length) {
          return h(
            ElSubMenu,
            { key: item.key, index: item.key, disabled: item.disabled },
            {
              title: () => item.label,
              default: () => renderItems(item.children),
            },
          )
        }
        return h(
          ElMenuItem,
          { key: item.key, index: item.key, disabled: item.disabled },
          { default: () => item.label },
        )
      })

    return () =>
      h(
        ElMenu,
        {
          mode: props.mode,
          defaultActive: props.modelValue,
          defaultOpeneds: props.defaultOpeneds,
          uniqueOpened: props.uniqueOpened,
          menuTrigger: props.trigger,
          collapse: props.collapse,
          ...attrs,
          onSelect: (index, indexPath) => {
            emit('update:modelValue', index)
            emit('select', index, indexPath)
          },
          onOpen: (index) => {
            // uniqueOpened 时 ElMenu 会关掉其他菜单，这里同步覆盖
            openKeys.value = props.uniqueOpened ? [index] : [...openKeys.value, index]
            emit('open-change', [...openKeys.value])
          },
          onClose: (index) => {
            openKeys.value = openKeys.value.filter((key) => key !== index)
            emit('open-change', [...openKeys.value])
          },
        },
        () => renderItems(props.items),
      )
  },
})
