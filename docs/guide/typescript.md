# TypeScript

UcUI 是纯 JS 源码 + 全量类型声明（`types/` 目录），TS 项目开箱即有补全，业务侧无需任何配置。

## 组件 props / emits

```ts
import { UcSelect, UcOption } from 'ucui'

const options: UcOption[] = [
  { label: '杭州', value: 'hz' },
  { label: '上海', value: 'sh', disabled: true },
]
```

SFC 模板中全局注册组件同样有提示（`GlobalComponents` 增强）：`<UcButton type="..." />`、`<UcList items="..." />` 属性自动补全，事件 `@change` 带参数类型。

## expose 实例方法

带 `expose` 的组件声明了实例类型，`InstanceType` 提取后方法签名齐全：

```ts
import { ref } from 'vue'
import { UcForm, UcScrollbar, UcFormInstance } from 'ucui'

const formRef = ref<InstanceType<typeof UcForm>>()
formRef.value?.validate().then((ok) => {
  // ok: boolean
})
formRef.value?.resetFields()

// 也可直接使用导出的实例接口
const sbRef = ref<UcScrollbarInstance>()
sbRef.value?.setScrollTop(100)
```

当前声明了 expose 的组件：UcForm（validate / resetFields / clearValidate）、UcInputOtp（focus / blur）、UcInputTag（focus / blur）、UcScrollbar（wrapRef / scrollTo / setScrollTop / setScrollLeft / update / handleScroll）。

## 服务式 API

`ComponentCustomProperties` 增强让全局属性有完整签名：

```ts
proxy.$message.success('保存成功') // UcMessageService
const action = await proxy.$messageBox.confirm('确认？', '提示') // Promise<'confirm'>
```

## 公共类型

主入口导出全部公共类型：

```ts
import type {
  UcOption, // 通用下拉/分组选项
  UcTreeOption, // 级联/树选项
  UcTableColumn, // UcTable 列定义
  UcSize, // 'large' | 'default' | 'small'
  UcFormInstance,
  UcScrollbarInstance,
} from 'ucui'
```

## 入口与类型对应

| 入口 | 类型文件 |
| --- | --- |
| `ucui`（install + 双端适配器） | `types/index.d.ts` |
| `ucui/element`（element-plus 适配器） | `types/element.d.ts` |
| `ucui/antd`（ant-design-vue 适配器） | `types/antd.d.ts` |
