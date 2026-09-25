# 快速开始

## 安装

```sh
npm install ucui vue element-plus
# 或使用 ant-design-vue 端
npm install ucui vue ant-design-vue
```

`element-plus` / `ant-design-vue` 是可选 peer 依赖：一个项目只需安装你使用的那一套；两套都装也可以，以 `lib` 选项为准。

## 全局安装

```ts
import { createApp } from 'vue'
import UcUI from 'ucui'
import 'element-plus/dist/index.css' // 底层库样式由业务方引入
import App from './App.vue'

const app = createApp(App)
app.use(UcUI, { lib: 'element' }) // 或 { lib: 'antd' }
app.mount('#app')
```

`app.use` 后：

- 86 个 `Uc` 组件全局注册（模板里直接 `<UcButton />`）
- 服务式 API 挂到全局属性：`$message` / `$notification` / `$messageBox`

## 第一个页面

```vue
<template>
  <UcSpace>
    <UcButton type="primary" @click="submit">提交</UcButton>
    <UcInput v-model="name" placeholder="姓名" clearable />
    <UcSelect v-model="city" :options="options" />
    <UcSwitch v-model="enabled" />
  </UcSpace>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const city = ref()
const enabled = ref(false)
const options = [
  { label: '杭州', value: 'hz' },
  { label: '上海', value: 'sh' },
]
</script>
```

## 按需引入

不需要全局注册时，从子入口直接引入组件（配合打包器 tree-shaking）：

```ts
import { UcButton, UcForm, UcFormItem } from 'ucui/element'
import { UcButton, UcList } from 'ucui/antd'
```

## Next

- 运行中切库 → [双端切换](/guide/dual-lib)
- 消息 / 通知 / 确认框 → [服务式 API](/guide/services)
- 类型补全 → [TypeScript](/guide/typescript)
