# 双端切换

UcUI 的核心能力：**同一份业务代码，两种底层实现**。`install` 时选定默认端，运行中可随时切换。

## 基本用法

```ts
import { applyLib } from '@lacunist/ucui'

// app 来自 createApp —— 与 app.use(UcUI) 等价的底层 API
applyLib(app, 'antd') // 整个 app 切到 ant-design-vue
applyLib(app, 'element') // 切回 element-plus
```

`applyLib` 会重新全局注册所有组件、重挂服务式 API。**已渲染的组件不会自动更新**——切换后需要让子树重新渲染：

```vue
<template>
  <UcSegmented v-model="lib" :options="libs" />
  <main :key="lib">
    <!-- 所有 Uc 组件 -->
  </main>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'
import { applyLib } from '@lacunist/ucui'

const { proxy } = getCurrentInstance()
const app = proxy.$.appContext.app

const lib = ref('element')
const libs = [
  { label: 'Element Plus', value: 'element' },
  { label: 'Ant Design Vue', value: 'antd' },
]
watch(lib, (v) => applyLib(app, v))
</script>
```

关键点：`:key="lib"` 强制 Vue 重建子树，新组件实例从全局注册表拿到新端实现。

## 实现原理

- `src/adapters/element/*` 与 `src/adapters/antd/*` 是两套平行的适配器，每个组件导出同名 `UcXxx`
- `applyLib(app, lib)` 遍历对应适配器，把 86 个条目注册到 app：组件走 `app.component`，服务对象（UcMessage 等）挂 `globalProperties`
- 适配器内部把统一 API（props / emits / 插槽）映射到底层组件，差异在适配层消化，业务层无感

## 注意事项

- 一个 app 实例同一时刻只有一套端生效（最后调用的 `applyLib` 决定）
- 服务式 API 在调用时从全局属性现取，切换后立即生效
- 底层库样式需业务方自行引入（切到哪端就引入哪端的样式）
