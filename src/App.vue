<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { applyLib } from './core'

// playground：直接用统一组件，不关心底层是哪套库
const inst = getCurrentInstance() || {}
const { proxy } = inst
function onClick(event) {
  console.log('UcButton click', event)
}

const inputValue = ref('')
const switchValue = ref(false)
const selectValue = ref()
const selectOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '禁用项', value: '3', disabled: true },
]
const checkboxValue = ref(false)
const radioValue = ref(false)
const textareaValue = ref('')
const formData = ref({ username: '' })
const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
}

// 第二梯队
const modalVisible = ref(false)
const tableData = [
  { name: '张三', age: 18 },
  { name: '李四', age: 20 },
]
const tableColumns = [
  { key: 'name', title: '姓名' },
  { key: 'age', title: '年龄', render: (row) => `${row.age}岁` },
]

function showMessage(type) {
  // 运行时可能切库，$message 每次从全局属性现取
  proxy?.$message?.[type](`${type} 消息`)
}

// 第三梯队
const drawerVisible = ref(false)
const page = ref(1)

// 第四梯队
const rateValue = ref(0)
const sliderValue = ref(30)
const activeTab = ref('a')
const tabItems = [
  { key: 'a', label: '标签A' },
  { key: 'b', label: '标签B' },
]

// 第五梯队
const spinning = ref(false)

// 第六梯队
const stepCurrent = ref(0)
const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '组件库', to: '/components' },
  { label: '面包屑' },
]

// 第七梯队
const activePanels = ref(['a'])
const collapseItems = [
  { key: 'a', title: '面板一' },
  { key: 'b', title: '面板二' },
]
const timelineItems = [
  { content: '创建服务成功', timestamp: '2026-09-01 10:00' },
  { content: '发布首个版本', timestamp: '2026-09-10 14:30' },
]
const pageLoading = ref(true)
const dropdownItems = [
  { label: '查看详情', key: 'detail' },
  { label: '编辑', key: 'edit' },
  { label: '删除', key: 'delete' },
]
function onDropdownCommand(key) {
  showMessage('info')
  console.log('dropdown command:', key)
}

// 第八梯队
const numberValue = ref(3)
const dateValue = ref('')
const cascaderValue = ref([])
const cascaderOptions = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [{ value: 'hangzhou', label: '杭州' }],
  },
]
const treeSelectValue = ref()
const treeSelectOptions = [
  {
    value: 'org',
    label: '组织架构',
    children: [{ value: 'team1', label: '团队一' }],
  },
]

// 第九梯队
const descItems = [
  { label: '姓名', value: '张三' },
  { label: '城市', value: '上海' },
  { label: '角色', value: '管理员' },
  { label: '备注', value: '统一组件库演示', span: 2 },
]

// 第十梯队
const timeValue = ref('')
const uploadFiles = ref([{ name: '已上传文件.png', status: 'success', uid: '1' }])
const transferTargetKeys = ref(['a'])
const transferData = [
  { key: 'a', label: '选项A' },
  { key: 'b', label: '选项B' },
  { key: 'c', label: '选项C' },
  { key: 'd', label: '选项D', disabled: true },
]

// 第十一梯队
const calendarValue = ref('')
function showNotification(type) {
  const $notification = proxy?.$notification
  if ($notification) {
    $notification[type](`${type} 标题`, '这是一条通知正文内容')
  }
}

// 第十二梯队
const autoValue = ref('')
const autoData = [
  { value: 'vue' },
  { value: 'vite' },
  { value: 'vitest' },
  { value: 'element-plus' },
  { value: 'ant-design-vue' },
]
function fetchSuggestions(query, cb) {
  const list = query
    ? autoData.filter((item) => item.value.includes(query.toLowerCase()))
    : autoData
  cb(list)
}
const treeCheckedKeys = ref([])
const treeData = [
  {
    key: 'components',
    label: '组件',
    children: [
      { key: 'button', label: '按钮' },
      { key: 'input', label: '输入框' },
    ],
  },
  { key: 'guide', label: '指南', disabled: true },
]
function onTreeNodeClick(key) {
  console.log('tree node-click:', key)
}
const mentionsValue = ref('')
const mentionsOptions = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' },
]

// 第十三梯队
const segmentedValue = ref('day')
const segmentedOptions = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
]
const imageUrl =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20cute%20cat%20avatar&image_size=square_hd'
const menuValue = ref('home')
const menuItems = [
  { key: 'home', label: '首页' },
  {
    key: 'system',
    label: '系统管理',
    children: [
      { key: 'user', label: '用户管理' },
      { key: 'role', label: '角色管理' },
    ],
  },
  { key: 'about', label: '关于' },
]
function onMenuSelect(key, keyPath) {
  console.log('menu select:', key, keyPath)
}

// 第十四梯队
const carouselCurrent = ref(0)
const carouselItems = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]
function onCarouselChange(current, prev) {
  console.log('carousel change:', current, prev)
}
const tourOpen = ref(false)
const tourCurrent = ref(0)
const tourSteps = [
  { title: '欢迎使用 UniUI', description: '这是第一步引导，介绍统一组件库。' },
  { title: 'UcCarousel 走马灯', description: '支持自动播放、箭头切换与 v-model 当前帧。' },
  { title: 'UcWatermark 水印', description: '可为任意内容区域添加文字或图片水印。' },
  { title: '完成', description: '引导结束，开始使用吧。' },
]
function onTourFinish() {
  console.log('tour finish')
}

// 第十五梯队
const anchorItems = [
  { href: '#basic-part', title: '基础部分' },
  {
    href: '#layout-part',
    title: '布局部分',
    children: [{ href: '#space-part', title: 'UcSpace' }],
  },
]
function onAnchorChange(href) {
  console.log('anchor change:', href)
}
function onAffixChange(fixed) {
  console.log('affix fixed:', fixed)
}

// 第十六梯队
const countdownTarget = Date.now() + 1000 * 60 * 45 + 10000
function onCountdownFinish() {
  console.log('countdown finish')
}

// 第十八梯队（UcSplitter / UcSplitterPanel）
function onSplitterResizeStart(index, sizes) {
  console.log('splitter resize-start:', index, sizes)
}
function onSplitterResize(index, sizes) {
  console.log('splitter resize:', index, sizes)
}
function onSplitterResizeEnd(index, sizes) {
  console.log('splitter resize-end:', index, sizes)
}
function onSplitterCollapse(index, type, sizes) {
  console.log('splitter collapse:', index, type, sizes)
}

// 第二十梯队（UcPageHeader / UcButtonGroup / UcAvatarGroup）
function onPageHeaderBack() {
  console.log('page-header back')
}

// 第二十一梯队（UcText / UcCheckTag / UcBacktop）
const checkTags = ref([
  { label: '前端', checked: true },
  { label: '后端', checked: false },
  { label: '运维', checked: false },
])
function onCheckTagChange(index, checked) {
  checkTags.value[index].checked = checked
}
function onBacktopClick() {
  console.log('backtop click')
}

// 第二十二梯队（UcRadioGroup / UcCheckboxGroup / UcMessageBox）
const radioGroupValue = ref('b')
const radioGroupOptions = [
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
  { label: '选项C（禁用）', value: 'c', disabled: true },
]
function onRadioGroupChange(value) {
  console.log('radio-group change:', value)
}
const checkboxGroupValue = ref(['apple'])
const checkboxGroupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橘子（禁用）', value: 'orange', disabled: true },
]
function onCheckboxGroupChange(value) {
  console.log('checkbox-group change:', value)
}
function showMessageBoxConfirm() {
  const $messageBox = proxy?.$messageBox
  if (!$messageBox) return
  $messageBox
    .confirm('确定要删除这条记录吗？删除后不可恢复。', '删除确认')
    .then(() => showMessage('success'))
    .catch(() => showMessage('info'))
}
function showMessageBoxAlert() {
  const $messageBox = proxy?.$messageBox
  if (!$messageBox) return
  $messageBox
    .alert('操作已完成，数据已同步。', '提示', { type: 'success', confirmText: '知道了' })
    .then(() => console.log('alert closed'))
}

// 第二十三梯队（UcInputOtp / UcTimeSelect / UcFloatButton）
const otpValue = ref('')
function onOtpFinish(value) {
  console.log('otp finish:', value)
}
const timeSelectValue = ref('09:30')
function onTimeSelectChange(value) {
  console.log('time-select change:', value)
}
function onFloatButtonClick() {
  showMessage('success')
}

// 第二十四梯队（UcFlex / UcList / UcInputTag）
const inputTagValue = ref(['vue', 'vite'])
function onInputTagChange(value) {
  console.log('input-tag change:', value)
}
const demoListItems = [
  {
    key: '1',
    title: '张三',
    description: '前端工程师',
    avatar:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal%20flat%20circle%20avatar%20icon&image_size=square',
  },
  { key: '2', title: '李四', description: '后端工程师', content: '负责网关与订单服务', actions: ['编辑', '删除'] },
  { key: '3', title: '王五', extra: '管理员' },
]

// ============ playground 交互：运行时切库 + 侧边导航 ============
const app = inst.appContext?.app

// 双端切换：重注册全局组件后，用 key 强制子树重渲染拿新实现
const lib = ref('element')
const libTick = ref(0)
const libOptions = [
  { label: 'Element Plus', value: 'element' },
  { label: 'Ant Design Vue', value: 'antd' },
]
watch(lib, (value) => {
  applyLib(app, value)
  libTick.value++
})

// 侧边导航：自动收集所有演示区块（保留已有 id，如锚点演示的 #space-part）
const navItems = ref([])
const navKeyword = ref('')
const activeNavId = ref('')
const filteredNavItems = computed(() => {
  const keyword = navKeyword.value.trim().toLowerCase()
  if (!keyword) return navItems.value
  return navItems.value.filter((item) => item.label.toLowerCase().includes(keyword))
})

let spyObserver = null

function collectSections() {
  const items = []
  document.querySelectorAll('.pg-main section').forEach((section, index) => {
    const title = section.querySelector('h2')
    if (!title) return
    if (!section.id) section.id = `pg-sec-${index}`
    items.push({ id: section.id, label: title.textContent.trim() })
  })
  navItems.value = items
  setupScrollSpy()
}

function setupScrollSpy() {
  spyObserver?.disconnect()
  spyObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeNavId.value = entry.target.id
      }
    },
    { rootMargin: '-72px 0px -70% 0px' },
  )
  navItems.value.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) spyObserver.observe(el)
  })
}

function jumpTo(id) {
  activeNavId.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(collectSections)
watch(libTick, () => nextTick(collectSections)) // 切库重渲染后重新收集
onBeforeUnmount(() => spyObserver?.disconnect())

</script>

<template>
  <div class="pg-shell">
    <aside class="pg-sidebar">
      <div class="pg-brand">UniUI Playground</div>
      <UcSegmented v-model="lib" :options="libOptions" block />
      <UcInput v-model="navKeyword" placeholder="搜索组件" clearable />
      <nav class="pg-nav">
        <a
          v-for="item in filteredNavItems"
          :key="item.id"
          :class="['pg-nav-item', { 'is-active': activeNavId === item.id }]"
          href="javascript:;"
          @click="jumpTo(item.id)"
        >{{ item.label }}</a>
        <p v-if="!filteredNavItems.length" class="pg-nav-empty">无匹配组件</p>
      </nav>
      <p class="pg-meta">
        {{ filteredNavItems.length }} / {{ navItems.length }} 个演示 ·
        当前 {{ lib === 'element' ? 'Element Plus' : 'Ant Design Vue' }}
      </p>
    </aside>

    <main class="pg-main" :key="libTick">
    <h1>UniUI Playground</h1>

    <section>
      <h2>UcButton type</h2>
      <UcButton type="primary" @click="onClick">primary</UcButton>
      <UcButton type="default" @click="onClick">default</UcButton>
      <UcButton type="danger" @click="onClick">danger</UcButton>
      <UcButton text @click="onClick">text</UcButton>
      <UcButton type="danger" text @click="onClick">danger + text</UcButton>
      <UcButton link @click="onClick">link</UcButton>
      <UcButton type="danger" link @click="onClick">danger + link</UcButton>
    </section>

    <section>
      <h2>UcButton size</h2>
      <UcButton size="large">large</UcButton>
      <UcButton size="default">default</UcButton>
      <UcButton size="small">small</UcButton>
    </section>

    <section>
      <h2>状态</h2>
      <UcButton disabled>disabled</UcButton>
      <UcButton loading>loading</UcButton>
    </section>

    <section>
      <h2>UcInput</h2>
      <UcInput v-model="inputValue" placeholder="请输入" clearable />
      <p>值: {{ inputValue }}</p>
      <UcInput v-model="inputValue" size="small" placeholder="small" />
      <UcInput v-model="inputValue" disabled placeholder="disabled" />
    </section>

    <section>
      <h2>UcSwitch</h2>
      <UcSwitch v-model="switchValue" />
      <UcSwitch v-model="switchValue" disabled />
      <p>值: {{ switchValue }}</p>
    </section>

    <section>
      <h2>UcSelect</h2>
      <UcSelect v-model="selectValue" :options="selectOptions" placeholder="请选择" clearable />
      <p>值: {{ selectValue }}</p>
      <UcSelect v-model="selectValue" :options="selectOptions" size="small" placeholder="small" />
    </section>

    <section>
      <h2>UcCheckbox</h2>
      <UcCheckbox v-model="checkboxValue">同意协议</UcCheckbox>
      <p>值: {{ checkboxValue }}</p>
      <UcCheckbox v-model="checkboxValue" disabled>禁用</UcCheckbox>
    </section>

    <section>
      <h2>UcRadio</h2>
      <UcRadio v-model="radioValue">选项 A</UcRadio>
      <p>值: {{ radioValue }}</p>
      <UcRadio v-model="radioValue" disabled>禁用</UcRadio>
    </section>

    <section>
      <h2>UcTextarea</h2>
      <UcTextarea v-model="textareaValue" placeholder="请输入多行文本" :rows="3" clearable />
      <p>值: {{ textareaValue }}</p>
      <UcTextarea v-model="textareaValue" :maxlength="10" show-count placeholder="带字数统计" />
    </section>

    <section>
      <h2>UcForm</h2>
      <UcForm ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <UcFormItem prop="username" label="用户名">
          <UcInput v-model="formData.username" placeholder="请输入用户名" />
        </UcFormItem>
        <UcFormItem>
          <UcButton type="primary" @click="$refs.formRef.validate().then(() => alert('通过')).catch(() => alert('失败'))">提交</UcButton>
          <UcButton @click="$refs.formRef.resetFields()">重置</UcButton>
        </UcFormItem>
      </UcForm>
    </section>

    <section>
      <h2>UcModal</h2>
      <UcButton type="primary" @click="modalVisible = true">打开弹窗</UcButton>
      <UcModal v-model="modalVisible" title="统一弹窗">
        <p>这是弹窗内容</p>
      </UcModal>
    </section>

    <section>
      <h2>UcMessage</h2>
      <UcButton @click="showMessage('success')">success</UcButton>
      <UcButton @click="showMessage('error')">error</UcButton>
      <UcButton @click="showMessage('warning')">warning</UcButton>
      <UcButton @click="showMessage('info')">info</UcButton>
    </section>

    <section>
      <h2>UcTable</h2>
      <UcTable :columns="tableColumns" :data="tableData" />
    </section>

    <section>
      <h2>UcAlert</h2>
      <UcAlert title="普通提示" type="info" />
      <UcAlert title="成功提示" type="success" />
      <UcAlert title="警告提示" type="warning" />
      <UcAlert title="错误提示" type="error" />
      <UcAlert title="可关闭" type="info" closable />
    </section>

    <section>
      <h2>UcTag</h2>
      <UcTag>默认</UcTag>
      <UcTag type="success">成功</UcTag>
      <UcTag type="warning">警告</UcTag>
      <UcTag type="danger">危险</UcTag>
      <UcTag type="info">信息</UcTag>
      <UcTag closable @close="showMessage('info')">可关闭</UcTag>
    </section>

    <section>
      <h2>UcBadge</h2>
      <UcBadge :value="5">
        <span>消息</span>
      </UcBadge>
      <UcBadge :value="100" :max="99">
        <span>上限</span>
      </UcBadge>
      <UcBadge dot>
        <span>圆点</span>
      </UcBadge>
    </section>

    <section>
      <h2>UcProgress</h2>
      <UcProgress :percentage="50" />
      <UcProgress :percentage="80" />
    </section>

    <section>
      <h2>UcPagination</h2>
      <UcPagination v-model="page" :total="50" :page-size="10" />
      <p>当前页: {{ page }}</p>
    </section>

    <section>
      <h2>UcDrawer</h2>
      <UcButton type="primary" @click="drawerVisible = true">打开抽屉</UcButton>
      <UcDrawer v-model="drawerVisible" title="统一抽屉" size="400px">
        <p>这是抽屉内容</p>
      </UcDrawer>
    </section>

    <section>
      <h2>UcRate</h2>
      <UcRate v-model="rateValue" />
      <p>值: {{ rateValue }}</p>
      <UcRate v-model="rateValue" disabled />
    </section>

    <section>
      <h2>UcSlider</h2>
      <UcSlider v-model="sliderValue" />
      <p>值: {{ sliderValue }}</p>
      <UcSlider v-model="sliderValue" disabled />
    </section>

    <section>
      <h2>UcTabs</h2>
      <UcTabs v-model="activeTab" :items="tabItems">
        <template #a>
          <p>面板 A 内容</p>
        </template>
        <template #b>
          <p>面板 B 内容</p>
        </template>
      </UcTabs>
    </section>

    <section>
      <h2>UcTooltip</h2>
      <UcTooltip content="提示文字">
        <UcButton>悬停查看提示</UcButton>
      </UcTooltip>
    </section>

    <section>
      <h2>UcDivider</h2>
      <UcDivider />
      <UcDivider orientation="left">靠左文本</UcDivider>
      <UcDivider dashed>虚线分割</UcDivider>
      <UcDivider direction="vertical" />
    </section>

    <section>
      <h2>UcSpin</h2>
      <UcButton @click="spinning = !spinning">切换加载</UcButton>
      <UcSpin :spinning="spinning" tip="加载中...">
        <p style="padding: 12px">被 loading 包裹的内容区域</p>
      </UcSpin>
    </section>

    <section>
      <h2>UcEmpty</h2>
      <UcEmpty description="暂无数据" />
    </section>

    <section>
      <h2>UcPopover</h2>
      <UcPopover title="标题" content="这是气泡卡片的内容" trigger="click">
        <UcButton>点击查看</UcButton>
      </UcPopover>
    </section>

    <section>
      <h2>UcCard</h2>
      <UcCard title="卡片标题" hoverable>
        <template #extra>
          <a>更多</a>
        </template>
        <p>这是卡片正文内容</p>
      </UcCard>
    </section>

    <section>
      <h2>UcAvatar</h2>
      <UcAvatar>K</UcAvatar>
      <UcAvatar shape="square" :size="48">U</UcAvatar>
    </section>

    <section>
      <h2>UcBreadcrumb</h2>
      <UcBreadcrumb :items="breadcrumbItems" />
    </section>

    <section>
      <h2>UcSteps</h2>
      <UcSteps v-model="stepCurrent" :items="[
        { title: '第一步', description: '填写信息' },
        { title: '第二步', description: '确认订单' },
        { title: '第三步', description: '完成' },
      ]" />
      <UcButton @click="stepCurrent = Math.min(stepCurrent + 1, 2)">下一步</UcButton>
    </section>

    <section>
      <h2>UcDropdown</h2>
      <UcDropdown :items="dropdownItems" trigger="click" @command="onDropdownCommand">
        <UcButton>点击选择操作</UcButton>
      </UcDropdown>
    </section>

    <section>
      <h2>UcCollapse</h2>
      <UcCollapse v-model="activePanels" :items="collapseItems">
        <template #a>
          <p>面板一展开内容</p>
        </template>
        <template #b>
          <p>面板二展开内容</p>
        </template>
      </UcCollapse>
    </section>

    <section>
      <h2>UcTimeline</h2>
      <UcTimeline :items="timelineItems" mode="left" />
    </section>

    <section>
      <h2>UcSkeleton</h2>
      <UcButton @click="pageLoading = !pageLoading">切换骨架屏</UcButton>
      <UcSkeleton :loading="pageLoading" active :rows="3">
        <p>骨架屏加载完成后显示的真实内容</p>
      </UcSkeleton>
    </section>

    <section>
      <h2>UcInputNumber</h2>
      <UcInputNumber v-model="numberValue" :min="0" :max="10" :step="1" />
      <p>值: {{ numberValue }}</p>
    </section>

    <section>
      <h2>UcDatePicker</h2>
      <UcDatePicker v-model="dateValue" />
      <p>值: {{ dateValue }}</p>
    </section>

    <section>
      <h2>UcCascader</h2>
      <UcCascader v-model="cascaderValue" :options="cascaderOptions" clearable />
      <p>值: {{ cascaderValue }}</p>
    </section>

    <section>
      <h2>UcTreeSelect</h2>
      <UcTreeSelect v-model="treeSelectValue" :options="treeSelectOptions" clearable />
      <p>值: {{ treeSelectValue }}</p>
    </section>

    <section>
      <h2>UcResult</h2>
      <UcResult status="success" title="操作成功" sub-title="请根据提示继续后续操作">
        <template #extra>
          <UcButton type="primary">返回首页</UcButton>
        </template>
      </UcResult>
    </section>

    <section>
      <h2>UcPopconfirm</h2>
      <UcPopconfirm title="确认删除这条记录吗？" confirm-text="删除" cancel-text="取消" @confirm="showMessage('success')" @cancel="showMessage('info')">
        <UcButton type="danger">删除</UcButton>
      </UcPopconfirm>
    </section>

    <section>
      <h2>UcStatistic</h2>
      <UcStatistic title="活跃用户" :value="123456" />
      <UcStatistic title="成交额" :value="9876.543" :precision="2" prefix="¥" />
      <UcStatistic title="完成率" :value="93" suffix="%" />
    </section>

    <section>
      <h2>UcDescriptions</h2>
      <UcDescriptions title="用户信息" bordered :column="2" :items="descItems">
        <template #extra>
          <UcButton size="small">编辑</UcButton>
        </template>
      </UcDescriptions>
    </section>

    <section>
      <h2>UcTimePicker</h2>
      <UcTimePicker v-model="timeValue" placeholder="请选择时间" />
      <p>值: {{ timeValue }}</p>
    </section>

    <section>
      <h2>UcUpload</h2>
      <UcUpload v-model="uploadFiles" action="#" :auto-upload="false">
        <UcButton type="primary">选择文件</UcButton>
      </UcUpload>
    </section>

    <section>
      <h2>UcTransfer</h2>
      <UcTransfer v-model="transferTargetKeys" :data="transferData" :titles="['源列表', '目标列表']" />
      <p>目标 keys: {{ transferTargetKeys }}</p>
    </section>

    <section>
      <h2>UcNotification</h2>
      <UcButton @click="showNotification('success')">success</UcButton>
      <UcButton @click="showNotification('error')">error</UcButton>
      <UcButton @click="showNotification('warning')">warning</UcButton>
      <UcButton @click="showNotification('info')">info</UcButton>
    </section>

    <section>
      <h2>UcCalendar</h2>
      <UcCalendar v-model="calendarValue" />
      <p>值: {{ calendarValue }}</p>
    </section>

    <section>
      <h2>UcAutoComplete</h2>
      <UcAutoComplete v-model="autoValue" :fetch-suggestions="fetchSuggestions" placeholder="输入试试" clearable />
      <p>值: {{ autoValue }}</p>
    </section>

    <section>
      <h2>UcTree</h2>
      <UcTree :data="treeData" show-checkbox default-expand-all v-model:checked-keys="treeCheckedKeys" @node-click="onTreeNodeClick" />
      <p>勾选 keys: {{ treeCheckedKeys }}</p>
    </section>

    <section>
      <h2>UcMentions</h2>
      <UcMentions v-model="mentionsValue" :options="mentionsOptions" placeholder="输入 @ 提及某人" />
      <p>值: {{ mentionsValue }}</p>
    </section>

    <section>
      <h2>UcSegmented</h2>
      <UcSegmented v-model="segmentedValue" :options="segmentedOptions" />
      <p>值: {{ segmentedValue }}</p>
    </section>

    <section>
      <h2>UcImage</h2>
      <UcImage :src="imageUrl" width="160" height="160" fit="cover" preview />
    </section>

    <section>
      <h2>UcMenu</h2>
      <div style="max-width: 240px">
        <UcMenu v-model="menuValue" :items="menuItems" @select="onMenuSelect" />
      </div>
      <p>选中: {{ menuValue }}</p>
    </section>

    <section>
      <h2>UcCarousel</h2>
      <UcCarousel
        v-model="carouselCurrent"
        :items="carouselItems"
        height="180px"
        arrow="always"
        @change="onCarouselChange"
      >
        <template #a>
          <div style="height: 180px; line-height: 180px; text-align: center; color: #fff; font-size: 20px; background: #5470c6">第一帧</div>
        </template>
        <template #b>
          <div style="height: 180px; line-height: 180px; text-align: center; color: #fff; font-size: 20px; background: #91cc75">第二帧</div>
        </template>
        <template #c>
          <div style="height: 180px; line-height: 180px; text-align: center; color: #fff; font-size: 20px; background: #fac858">第三帧</div>
        </template>
      </UcCarousel>
      <p>当前帧: {{ carouselCurrent }}</p>
    </section>

    <section>
      <h2>UcWatermark</h2>
      <UcWatermark :content="['UniUI', '机密演示']" :gap="[120, 120]">
        <p style="height: 160px; padding: 12px">水印覆盖的内容区域，水印层不影响鼠标事件</p>
      </UcWatermark>
    </section>

    <section>
      <h2>UcTour</h2>
      <UcButton type="primary" @click="tourOpen = true">开始引导</UcButton>
      <UcTour
        v-model="tourOpen"
        v-model:current="tourCurrent"
        :steps="tourSteps"
        type="primary"
        @finish="onTourFinish"
      />
    </section>

    <section id="space-part">
      <h2>UcSpace</h2>
      <UcSpace size="large">
        <UcButton type="primary">主按钮</UcButton>
        <UcButton>次按钮</UcButton>
        <UcButton text>文字按钮</UcButton>
      </UcSpace>
      <UcSpace direction="vertical" align="start" style="margin-top: 12px">
        <span>纵向间距第一行</span>
        <span>纵向间距第二行</span>
        <span>纵向间距第三行</span>
      </UcSpace>
      <UcSpace style="margin-top: 12px">
        <template #separator><span style="color: #999">|</span></template>
        <a href="javascript:;">编辑</a>
        <a href="javascript:;">复制</a>
        <a href="javascript:;">删除</a>
      </UcSpace>
    </section>

    <section>
      <h2>UcAffix</h2>
      <p>下方按钮在滚动超过 120px 后固定在顶部（滚动页面查看效果）</p>
      <UcAffix :offset="120" @change="onAffixChange">
        <UcButton type="primary">固定在顶部的按钮</UcButton>
      </UcAffix>
    </section>

    <section id="layout-part" style="height: 320px">
      <h2>UcAnchor</h2>
      <UcAnchor :items="anchorItems" :offset="80" @change="onAnchorChange" />
      <div id="basic-part" style="margin-top: 16px">基础部分锚点目标</div>
    </section>

    <section>
      <h2>UcRow / UcCol</h2>
      <UcRow :gutter="16">
        <UcCol :span="8"><div style="background: #d9ecff; padding: 12px">span 8</div></UcCol>
        <UcCol :span="8"><div style="background: #e1f3d8; padding: 12px">span 8</div></UcCol>
        <UcCol :span="8"><div style="background: #fdf6ec; padding: 12px">span 8</div></UcCol>
      </UcRow>
      <UcRow :gutter="16" justify="center" style="margin-top: 12px">
        <UcCol :span="6" :offset="2"><div style="background: #f4e4ff; padding: 12px">span 6 offset 2</div></UcCol>
        <UcCol :span="6"><div style="background: #ffe7ec; padding: 12px">span 6</div></UcCol>
      </UcRow>
    </section>

    <section>
      <h2>UcLink</h2>
      <UcSpace>
        <UcLink href="javascript:;">默认链接</UcLink>
        <UcLink type="primary" href="javascript:;">主要链接</UcLink>
        <UcLink type="success" href="javascript:;">成功</UcLink>
        <UcLink type="warning" href="javascript:;">警告</UcLink>
        <UcLink type="danger" href="javascript:;">危险</UcLink>
        <UcLink type="primary" underline="always" href="javascript:;">常显下划线</UcLink>
        <UcLink type="primary" underline="never" href="javascript:;">无下划线</UcLink>
        <UcLink disabled href="javascript:;">禁用链接</UcLink>
      </UcSpace>
    </section>

    <section>
      <h2>UcCountdown</h2>
      <UcCountdown
        :value="countdownTarget"
        title="距离活动结束"
        suffix="后"
        :value-style="{ color: '#f56c6c', fontWeight: 600 }"
        @finish="onCountdownFinish"
      />
    </section>

    <section>
      <h2>UcLayout 布局族</h2>
      <UcLayout direction="horizontal" style="border: 1px solid #dcdfe6; min-height: 320px">
        <UcLayoutSider :width="200" style="background: #304156; color: #bfcbd9; padding: 16px">
          <div style="font-weight: 600; color: #fff; margin-bottom: 12px">UniUI 导航</div>
          <div style="line-height: 2">· 概览</div>
          <div style="line-height: 2">· 组件</div>
          <div style="line-height: 2">· 设置</div>
        </UcLayoutSider>
        <UcLayout direction="vertical">
          <UcLayoutHeader :height="56" style="background: #fff; border-bottom: 1px solid #dcdfe6; padding: 0 20px; line-height: 56px">
            顶部导航栏（height 56）
          </UcLayoutHeader>
          <UcLayoutContent style="padding: 20px; background: #f5f7fa">
            <p>内容区（UcLayoutContent）</p>
            <p>外层 horizontal：侧栏 + 右侧纵向布局；内层 vertical：Header / Content / Footer。</p>
          </UcLayoutContent>
          <UcLayoutFooter :height="48" style="background: #fff; border-top: 1px solid #dcdfe6; text-align: center; line-height: 48px; color: #909399">
            底部栏（height 48）
          </UcLayoutFooter>
        </UcLayout>
      </UcLayout>
    </section>

    <section>
      <h2>UcScrollbar 滚动容器</h2>
      <UcScrollbar height="160px" style="border: 1px solid #dcdfe6; border-radius: 4px">
        <div v-for="n in 12" :key="n" style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0">
          滚动内容第 {{ n }} 行——超出 160px 高度后出现细滚动条
        </div>
      </UcScrollbar>
    </section>

    <section>
      <h2>UcSplitter 分隔面板（拖拽 / 折叠 / lazy）</h2>
      <UcSplitter
        lazy
        style="height: 280px; border: 1px solid #dcdfe6; border-radius: 4px; overflow: hidden"
        @resize-start="onSplitterResizeStart"
        @resize="onSplitterResize"
        @resize-end="onSplitterResizeEnd"
        @collapse="onSplitterCollapse"
      >
        <UcSplitterPanel :size="200" :min="120" collapsible>
          <div style="padding: 16px; background: #ecf5ff; height: 100%">
            <strong>左面板</strong>
            <p>size 200 / min 120，可折叠，可拖拽分隔条。</p>
          </div>
        </UcSplitterPanel>
        <UcSplitterPanel :min="160" collapsible>
          <div style="padding: 16px; background: #f0f9eb; height: 100%">
            <strong>右面板</strong>
            <p>min 160；lazy 模式下拖动时显示幽灵指示条，松手才应用尺寸。</p>
          </div>
        </UcSplitterPanel>
      </UcSplitter>
    </section>

    <section>
      <h2>UcPageHeader 页头</h2>
      <UcPageHeader
        title="订单详情"
        content="单号 #2026092501"
        style="border: 1px solid #dcdfe6; border-radius: 4px"
        @back="onPageHeaderBack"
      >
        <template #extra>
          <UcButton type="primary">操作</UcButton>
        </template>
        <div style="padding: 12px 0">页头下方的主体内容区域。</div>
      </UcPageHeader>
    </section>

    <section>
      <h2>UcButtonGroup 按钮组（size/type 统一下发）</h2>
      <UcButtonGroup type="primary" style="margin-right: 16px">
        <UcButton>上一页</UcButton>
        <UcButton>编辑</UcButton>
        <UcButton>下一页</UcButton>
      </UcButtonGroup>
      <UcButtonGroup size="small" direction="vertical" style="vertical-align: top">
        <UcButton>置顶</UcButton>
        <UcButton>下沉</UcButton>
      </UcButtonGroup>
    </section>

    <section>
      <h2>UcAvatarGroup 头像组（超出 max 折叠为 +N）</h2>
      <UcAvatarGroup :max="3" size="large">
        <UcAvatar src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avatar%20portrait%20A&image_size=square" />
        <UcAvatar>B</UcAvatar>
        <UcAvatar>C</UcAvatar>
        <UcAvatar>D</UcAvatar>
        <UcAvatar>E</UcAvatar>
      </UcAvatarGroup>
    </section>

    <section>
      <h2>UcText 排版文本（语义色 / 省略 / 行数）</h2>
      <p>
        <UcText>默认文本</UcText>
        <UcText type="success" style="margin-left: 12px">成功文本</UcText>
        <UcText type="warning" style="margin-left: 12px">警告文本</UcText>
        <UcText type="danger" style="margin-left: 12px">危险文本</UcText>
        <UcText type="info" style="margin-left: 12px">次要信息</UcText>
      </p>
      <UcText truncated style="display: block; max-width: 240px">
        这是一段很长很长的内容，开启 truncated 后超出单行宽度会显示省略号。
      </UcText>
      <UcText :line-clamp="2" style="display: block; max-width: 240px; margin-top: 8px">
        这是一段超过两行的内容：第一行占位占位占位，第二行占位占位占位，第三行应当被 lineClamp 截断。
      </UcText>
    </section>

    <section>
      <h2>UcCheckTag 可勾选标签（v-model:checked）</h2>
      <UcCheckTag
        v-for="(tag, index) in checkTags"
        :key="tag.label"
        :checked="tag.checked"
        type="primary"
        style="margin-right: 8px"
        @change="(checked) => onCheckTagChange(index, checked)"
      >
        {{ tag.label }}
      </UcCheckTag>
      <UcCheckTag disabled style="margin-left: 8px">禁用标签</UcCheckTag>
    </section>

    <section style="height: 120px">
      <h2>UcBacktop 回到顶部（滚动页面超过 200px 后右下角出现）</h2>
      <UcBacktop :right="60" @click="onBacktopClick" />
    </section>

    <section>
      <h2>UcRadioGroup 单选组（options / 按钮形态）</h2>
      <UcRadioGroup v-model="radioGroupValue" :options="radioGroupOptions" @change="onRadioGroupChange" />
      <p>值: {{ radioGroupValue }}</p>
      <UcRadioGroup v-model="radioGroupValue" :options="radioGroupOptions" type="button" />
    </section>

    <section>
      <h2>UcCheckboxGroup 多选组（options）</h2>
      <UcCheckboxGroup v-model="checkboxGroupValue" :options="checkboxGroupOptions" @change="onCheckboxGroupChange" />
      <p>值: {{ checkboxGroupValue }}</p>
      <UcCheckboxGroup :model-value="['apple']" :options="checkboxGroupOptions" disabled />
    </section>

    <section>
      <h2>UcMessageBox 确认框（Promise 语义）</h2>
      <UcButton type="danger" @click="showMessageBoxConfirm">confirm 删除确认</UcButton>
      <UcButton @click="showMessageBoxAlert">alert 成功提示</UcButton>
    </section>

    <section>
      <h2>UcInputOtp 验证码输入（length / mask / validator）</h2>
      <UcInputOtp v-model="otpValue" :length="4" @finish="onOtpFinish" />
      <p>值: {{ otpValue }}</p>
      <UcInputOtp v-model="otpValue" :length="6" mask />
    </section>

    <section>
      <h2>UcTimeSelect 时间选择（start / end / step / minTime / maxTime）</h2>
      <UcTimeSelect
        v-model="timeSelectValue"
        start="08:00"
        end="18:00"
        step="00:30"
        min-time="08:30"
        max-time="17:30"
        placeholder="请选择时间"
        @change="onTimeSelectChange"
      />
      <p>值: {{ timeSelectValue }}</p>
      <UcTimeSelect start="09:00" end="12:00" step="01:00" disabled />
    </section>

    <section style="height: 160px">
      <h2>UcFloatButton 浮动按钮（type / shape，页面右下角）</h2>
      <UcFloatButton type="primary" @click="onFloatButtonClick">
        <template #icon><span>+</span></template>
      </UcFloatButton>
      <UcFloatButton shape="square" tooltip="新建流程">
        <template #icon><span>✎</span></template>
        新建
      </UcFloatButton>
    </section>

    <section>
      <h2>UcFlex 弹性布局（vertical / justify / align / gap）</h2>
      <UcFlex gap="small" align="center" style="margin-bottom: 8px">
        <UcTag>flex 标签一</UcTag>
        <UcTag type="success">flex 标签二</UcTag>
        <UcTag type="danger">flex 标签三</UcTag>
      </UcFlex>
      <UcFlex vertical gap="middle" justify="center" align="center" style="height: 120px; border: 1px dashed #ddd">
        <UcButton size="small">纵向按钮一</UcButton>
        <UcButton size="small">纵向按钮二</UcButton>
      </UcFlex>
    </section>

    <section>
      <h2>UcList 列表（header / footer / actions / extra）</h2>
      <UcList bordered :items="demoListItems" header="团队成员" footer="共 3 人" />
    </section>

    <section>
      <h2>UcInputTag 标签输入器（回车添加 / Backspace 删除 / 可清空）</h2>
      <UcInputTag v-model="inputTagValue" placeholder="输入后回车添加" clearable @change="onInputTagChange" />
      <p>值: {{ inputTagValue }}</p>
      <UcInputTag placeholder="禁用态" disabled />
    </section>
    </main>
  </div>
</template>

<style scoped>
.pg-shell {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.pg-sidebar {
  position: sticky;
  top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 260px;
  flex-shrink: 0;
  max-height: calc(100vh - 32px);
}

.pg-brand {
  font-size: 18px;
  font-weight: 600;
  color: #1f2d3d;
}

.pg-nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
}

.pg-nav-item {
  display: block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #4e5969;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pg-nav-item:hover {
  background: #f5f7fa;
}

.pg-nav-item.is-active {
  background: #ecf5ff;
  color: #409eff;
}

.pg-nav-empty {
  padding: 12px;
  font-size: 12px;
  color: #999;
  text-align: center;
}

.pg-meta {
  font-size: 12px;
  color: #999;
}

.pg-main {
  flex: 1;
  min-width: 0;
}

.pg-main h1 {
  margin-bottom: 16px;
}

section {
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
  scroll-margin-top: 16px;
}

section :deep(button) {
  margin-right: 12px;
}
</style>
