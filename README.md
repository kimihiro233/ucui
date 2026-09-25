# UcUI

一套代码，双端渲染的 Vue 3 组件库。统一 API 之下按需驱动 [element-plus](https://element-plus.org) 或 [ant-design-vue](https://antdv.com) 渲染，**运行时可切换**，无需改一行业务代码。

- 86 个组件统一 API（`Uc` 前缀），覆盖基础输入、表单容器、数据展示、反馈弹层、导航、布局
- 全量 TypeScript 类型声明（props / emits / expose 实例方法 / 全局属性）
- 完整双端契约测试（1400+ 用例），行为逐一对齐
- 服务式 API：`$message` / `$notification` / `$messageBox` 双端语义归一

## 安装

```sh
npm install ucui vue element-plus
# 或
npm install ucui vue ant-design-vue
```

`element-plus` / `ant-design-vue` 为可选 peer 依赖：一个项目只需安装你使用的那一套（也都安装则以 `lib` 选项为准）。

## 快速开始

```ts
import { createApp } from 'vue'
import UcUI from 'ucui'
import 'element-plus/dist/index.css'   // 底层库样式由你引入
import App from './App.vue'

const app = createApp(App)
app.use(UcUI, { lib: 'element' })      // 或 { lib: 'antd' }
app.mount('#app')
```

模板里直接使用统一组件：

```vue
<template>
  <UcButton type="primary" @click="submit">提交</UcButton>
  <UcInput v-model="name" placeholder="姓名" clearable />
  <UcSelect v-model="city" :options="options" />
</template>
```

## 双端切换

`install` 时选定底层库；运行中可通过 `applyLib` 切换（已渲染组件需配合子树 `:key` 重新渲染）：

```ts
import { applyLib } from 'ucui'

applyLib(app, 'antd')   // 切到 ant-design-vue
applyLib(app, 'element') // 切回 element-plus
```

## 按需引入

`ucui` 全量入口包含双端适配器；只需一套时从子入口引入，配合打包器 tree-shaking：

```ts
import { UcButton, UcInput } from 'ucui/element'
import { UcButton, UcList } from 'ucui/antd'   // antd 端
```

## 服务式 API

```ts
// 任意组件内（app.use 之后）
proxy.$message.success('已保存')
proxy.$notification.warning('磁盘告警', '可用空间不足 10%')
await proxy.$messageBox.confirm('确认删除？', '提示')   // Promise<'confirm'> / reject 'cancel'
```

## TypeScript

- 所有组件的 props / emits 类型齐全，SFC 模板内 `<UcButton type="primary" />` 自动补全（GlobalComponents）
- expose 实例方法：`ref<InstanceType<typeof UcForm>>()` 后 `formRef.value?.validate()` 有完整签名
- 服务式 API 类型经 `ComponentCustomProperties` 全局生效
- 公共类型从主入口导出：`import type { UcOption, UcTableColumn } from 'ucui'`

## 组件清单（86 个）

<details>
<summary>展开查看</summary>

- **基础**：UcButton / UcButtonGroup / UcLink / UcText / UcDivider / UcFloatButton / UcBacktop
- **输入**：UcInput / UcTextarea / UcInputNumber / UcInputTag / UcInputOtp / UcAutoComplete / UcMentions / UcSelect / UcTimeSelect / UcTimePicker / UcDatePicker / UcCalendar / UcCascader / UcTreeSelect / UcTree / UcSwitch / UcCheckbox / UcCheckboxGroup / UcRadio / UcRadioGroup / UcSegmented / UcCheckTag / UcRate / UcSlider / UcUpload / UcTransfer
- **表单容器**：UcForm / UcFormItem
- **数据展示**：UcTable / UcTag / UcBadge / UcAvatar / UcAvatarGroup / UcImage / UcCard / UcDescriptions / UcList / UcStatistic / UcCountdown / UcPagination / UcTabs / UcCollapse / UcTimeline / UcSkeleton / UcEmpty / UcResult / UcProgress / UcTooltip / UcPopover / UcPopconfirm
- **反馈**：UcModal / UcDrawer / UcAlert / UcSpin / UcMessage / UcNotification / UcMessageBox
- **导航**：UcMenu / UcBreadcrumb / UcSteps / UcDropdown / UcPageHeader / UcAffix / UcAnchor
- **其他**：UcLayout 族 / UcRow / UcCol / UcFlex / UcSpace / UcScrollbar / UcSplitter / UcSplitterPanel / UcCarousel / UcWatermark / UcTour

</details>

完整 API 与示例见文档站（`npm run docs:dev` 本地启动）。

## 开发

```sh
npm install
npm run dev              # playground（双端切换 + 全组件演示）
npm run test:run         # 全量双端测试
npm run build            # 库构建（dist/）
npm run build:playground # playground 构建
npm run docs:dev         # 文档站
```

## License

[MIT](./LICENSE)
