# 组件总览

UcUI 当前收录 **86 个组件**，全部双端可用（element-plus / ant-design-vue 渲染同一 API）。以下示例由 element-plus 端真实渲染。

<script setup>
import { ref } from 'vue'
import 'element-plus/dist/index.css'
import UcButton from '../../src/adapters/element/button'
import UcInput from '../../src/adapters/element/input'
import UcSwitch from '../../src/adapters/element/switch'
import UcSelect from '../../src/adapters/element/select'
import UcTag from '../../src/adapters/element/tag'
import UcAlert from '../../src/adapters/element/alert'
import UcSpace from '../../src/adapters/element/space'

const name = ref('UcUI')
const city = ref()
const on = ref(true)
const cities = [
  { label: '杭州', value: 'hz' },
  { label: '上海', value: 'sh' },
  { label: '禁用项', value: 'x', disabled: true },
]
</script>

## 现场演示

<div class="demo-block">
  <UcAlert title="UcUI 双端组件库" type="success" :closable="false" style="margin-bottom:16px" />
  <UcSpace>
    <UcButton type="primary" @click="() => { name = name + '!' }">点我</UcButton>
    <UcInput v-model="name" placeholder="输入姓名" clearable style="width:200px" />
    <UcSelect v-model="city" :options="cities" placeholder="选择城市" style="width:160px" />
    <UcSwitch v-model="on" />
    <UcTag v-if="on" type="success">开关已开</UcTag>
  </UcSpace>
</div>

## 基础

| 组件 | 说明 |
| --- | --- |
| UcButton | 按钮（primary / default / danger，text、link、loading） |
| UcButtonGroup | 按钮组 |
| UcLink | 链接 |
| UcText | 文本排版（type/size/truncated/lineClamp） |
| UcDivider | 分割线 |
| UcFloatButton | 浮动按钮 |
| UcBacktop | 回到顶部 |

## 输入

| 组件 | 说明 |
| --- | --- |
| UcInput | 输入框（v-model、clearable） |
| UcTextarea | 文本域 |
| UcInputNumber | 数字输入 |
| UcInputTag | 标签输入（element 原生，antd 桥接 ASelect tags） |
| UcInputOtp | 一次性密码输入（finish 事件） |
| UcAutoComplete | 自动补全（fetchSuggestions 回调） |
| UcMentions | 提及（@ 唤起） |
| UcSelect | 下拉选择 |
| UcTimeSelect | 时间点选择（start/end/step） |
| UcTimePicker | 时间选择器 |
| UcDatePicker | 日期选择器 |
| UcCalendar | 日历 |
| UcCascader | 级联选择 |
| UcTreeSelect | 树形选择 |
| UcTree | 树形控件（v-model:checkedKeys 受控） |
| UcSwitch | 开关 |
| UcCheckbox / UcCheckboxGroup | 复选 / 复选组 |
| UcRadio / UcRadioGroup | 单选 / 单选组 |
| UcSegmented | 分段控制器 |
| UcCheckTag | 可选中标签（v-model:checked） |
| UcRate | 评分 |
| UcSlider | 滑块 |
| UcUpload | 上传（change(file, fileList) 归一化） |
| UcTransfer | 穿梭框 |

## 表单容器

| 组件 | 说明 |
| --- | --- |
| UcForm | 表单（rules 校验，expose validate/resetFields/clearValidate） |
| UcFormItem | 表单项 |

## 数据展示

| 组件 | 说明 |
| --- | --- |
| UcTable | 表格（columns 数据驱动，render 列） |
| UcTag | 标签 |
| UcBadge | 徽标（value/max/dot） |
| UcAvatar / UcAvatarGroup | 头像 / 头像组 |
| UcImage | 图片（fit/preview/@error） |
| UcCard | 卡片 |
| UcDescriptions | 描述列表 |
| UcList | 列表（items 数据驱动） |
| UcStatistic | 数值统计 |
| UcCountdown | 倒计时（finish 事件） |
| UcPagination | 分页 |
| UcTabs | 标签页 |
| UcCollapse | 折叠面板 |
| UcTimeline | 时间线 |
| UcSkeleton | 骨架屏 |
| UcEmpty | 空状态 |
| UcResult | 结果页 |
| UcProgress | 进度条 |
| UcTooltip / UcPopover / UcPopconfirm | 气泡提示 / 弹出卡片 / 气泡确认 |

## 反馈

| 组件 | 说明 |
| --- | --- |
| UcModal | 对话框 |
| UcDrawer | 抽屉 |
| UcAlert | 警告提示 |
| UcSpin | 加载中 |
| UcMessage | 全局消息（$message 服务） |
| UcNotification | 全局通知（$notification 服务） |
| UcMessageBox | 确认框（$messageBox 服务，Promise 语义） |

## 导航

| 组件 | 说明 |
| --- | --- |
| UcMenu | 菜单（@select(key, keyPath)） |
| UcBreadcrumb | 面包屑 |
| UcSteps | 步骤条 |
| UcDropdown | 下拉菜单（@command） |
| UcPageHeader | 页头（@back） |
| UcAffix | 固钉（@change(fixed)） |
| UcAnchor | 锚点 |

## 布局与其他

| 组件 | 说明 |
| --- | --- |
| UcLayout / UcLayoutHeader / UcLayoutContent / UcLayoutFooter / UcLayoutSider | 布局族 |
| UcRow / UcCol | 栅格 |
| UcFlex | flex 布局（gap 档位 / flex） |
| UcSpace | 间距 |
| UcScrollbar | 滚动条（expose scrollTo 等） |
| UcSplitter / UcSplitterPanel | 分栏（resize 事件族） |
| UcCarousel | 走马灯（v-model 当前帧） |
| UcWatermark | 水印 |
| UcTour | 引导（v-model:current） |
