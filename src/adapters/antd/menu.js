import { defineComponent, h, ref, watch } from 'vue'
import { Menu } from 'ant-design-vue'

// UcMenu：导航菜单
// 统一 API：
//   v-model(选中 key) / mode(horizontal|vertical) /
//   items=[{key,label,disabled?,children?}] 数据驱动（字段与 antd 一致直接传）/
//   defaultOpeneds(初始展开) / uniqueOpened / trigger(hover|click) / collapse +
//   @select(key,keyPath) @open-change(keys)
// antd 差异：vertical 统一模式映射为 inline（行内展开，对齐 element vertical 行为）；
// selectedKeys/openKeys 为数组且受控；该版本 keyPath 已为根→叶顺序
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
    // antd openKeys 受控（uniqueOpened 需要在 onOpenChange 中裁决）
    const openKeys = ref([...props.defaultOpeneds])
    watch(
      () => props.defaultOpeneds,
      (value) => {
        openKeys.value = [...value]
      },
    )

    return () =>
      h(
        Menu,
        {
          mode: props.mode === 'horizontal' ? 'horizontal' : 'inline',
          items: props.items,
          selectedKeys: props.modelValue ? [props.modelValue] : [],
          openKeys: openKeys.value,
          triggerSubMenuAction: props.trigger,
          inlineCollapsed: props.collapse,
          ...attrs,
          onSelect: ({ key, keyPath }) => {
            // 该版本 antd keyPath 已为根→叶子（[...parentKeys, key]），直接归一化
            emit('update:modelValue', key)
            emit('select', key, [...keyPath])
          },
          onOpenChange: (keys) => {
            let next = keys
            if (props.uniqueOpened && keys.length > openKeys.value.length) {
              // 只保留最新展开的一个
              next = [keys.find((key) => !openKeys.value.includes(key))]
            }
            openKeys.value = next
            emit('open-change', [...next])
          },
        },
      )
  },
})
