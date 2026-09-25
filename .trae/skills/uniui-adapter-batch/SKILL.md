---
name: uniui-adapter-batch
description: 为 UniUI 统一组件库批量新增 Uc 组件的双端适配器（element-plus / ant-design-vue）、契约测试与注册。当用户要求继续推进梯队、新增某个 Uc 组件适配、批量补齐组件时使用。不用于业务页面开发。
---

# UniUI 适配器批量交付流程

为统一组件库新增一个（或一批）`UcXxx` 组件时严格按本流程执行。目标是每个组件都有：统一 API、双端适配器、契约测试、注册、playground 演示。

## 架构铁律（不可违反）

1. `src/core/` 零 UI 库依赖，只维护注册表与插件安装。
2. 只有 `src/adapters/element/` 和 `src/adapters/antd/` 允许 import 底层库。
3. 适配器一律 `defineComponent` + `h()` 渲染底层组件，`inheritAttrs: false`，显式 props 优先，`...attrs` 放最后做逃生舱。
4. 对外只暴露标准 `modelValue` / `update:modelValue`，底层差异（antd 的 `value`/`checked`/`open`/`activeKey` 等）在适配器内部转换。
5. antd 的 change 类回调常传 event 对象，必须归一化为值；antd 的 `allowClear` 对应统一层 `clearable`。
6. size 三档统一 `large | default | small`，antd 中间档是 `middle`，复用 `adapters/{lib}/shared.js`。
7. 服务式条目（如 UcMessage）不是组件，不写 render/setup，core 层 `isComponent()` 自动识别并挂到 `globalProperties.$xxx`，不要手动 `app.component`。

## 标准交付步骤

对批次内每个组件：

1. **先定统一 API**：props/emits 名称取两端交集的语义命名（参考下方命名惯例），不确定时优先对齐 element 的语义、antd 差异写进适配器。
2. **写双端适配器**：`src/adapters/element/{name}.js`、`src/adapters/antd/{name}.js`。
3. **写契约**：`src/adapters/__tests__/{name}.contract.js`，导出 `{name}Contract(libName, UcXxx)`，只放两端都必须满足的行为断言。
4. **写双端 spec**：`{name}.element.spec.js`、`{name}.antd.spec.js`，引用契约 + 各自专属映射断言（底层类名/prop 桥接）。
5. **注册**：在两个 `src/adapters/{lib}/index.js` 中 import 并加入导出对象，命名保持 `UcXxx`。
6. **跑该组件测试**：`npx vitest run {name}`（不要加 --reporter=basic）。
7. 整批完成后跑 `npx vitest.run` 全量确认无回归，再更新 `src/App.vue` playground 演示。
8. 把本批新发现的 API 决策和踩坑追加到 project_memory.md。

## 适配器骨架模板

```js
import { defineComponent, h } from 'vue'
import { ElXxx } from 'element-plus' // antd 侧 from 'ant-design-vue'

export default defineComponent({
  name: 'UcXxx',
  inheritAttrs: false,
  props: {
    modelValue: { type: ???, default: ??? },
    // 其余统一 props
  },
  emits: ['update:modelValue' /*, 'change' 等 */],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElXxx, // antd 侧为 Xxx，并在 props 上做 modelValue->value/checked/open 的转换
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
          // ...显式映射
          ...attrs,
          // onChange 等事件归一化放 attrs 之后，防止被覆盖
        },
        slots, // 底层用插槽/子组件定义结构时（Table/Tabs），传 () => 子节点数组
      )
  },
})
```

契约骨架：

```js
import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

export function xxxContract(libName, UcXxx) {
  describe(`UcXxx 契约 [${libName}]`, () => {
    it('基础渲染', () => { /* ... */ })
    // 异步渲染（element Table/Select）必须 await flushPromises()
    // happy-dom 不支持的行为（transition 动画、popper）用"出现则断言"兼容模式
  })
}
```

## 已锁定的统一 API 惯例

- 布尔显隐类弹层（Modal/Drawer）：`v-model` + `title` + `@open`/`@close`；antd 的 `v-model:open` 内部归一化。
- 数据录入（Input/Select/Switch/Checkbox/Radio/Textarea/Rate/Slider）：统一 `v-model` + `disabled` + `@change`。
- Table：`columns=[{ key, title, render?(row) }]` + `data`；element 侧转 ElTableColumn 插槽，antd 侧 render 映射为 `customRender({ record })`。
- Tabs：`v-model`(激活 key) + `items=[{ key, label, disabled? }]`，面板内容走具名插槽（插槽名=key）。
- Tooltip/Popover：`content`（Popover 另有 title）+ 默认插槽为触发元素。
- Tag/Alert：`type` 取值用语义命名（success/warning/danger/info），两端色值差异在适配器映射。

## 踩坑清单（动手前必读，避免重复试错）

1. **VTU 默认 stub 掉 Transition**：element Dialog/Drawer 的 `update:modelValue(false)` 只在真实 transition 的 `afterLeave` 钩子 emit，happy-dom 下永远不触发。解法：适配器注入 `beforeClose: (done) => { emit('update:modelValue', false); done() }`。
2. **不要写空转测试**：断言元素前先确认它真的渲染；element 弹层内容在 transition-stub 下可能整体不渲染，这类断言只在 antd 侧做，element 契约降级为容器存在性断言。
3. **antd-vue 4.x 不等于全部 items 模式**：本项目 Tabs 基于 rc-tabs 11，没有 items prop，必须用 TabPane 子节点（tab prop 是标签文案）；新组件前先读 node_modules 里的实际 props 定义，禁止想当然。
4. **element 命名差异**：Badge 圆点是 `isDot`（不是 dot）；Rate 星星是 `span.el-rate__item`，且 `modelValue=0` 时 setup 初始就 emit 0，点击断言取 `emitted().at(-1)`。
5. **antd 点击目标常在内层**：Rate 的 click handler 在内部 `div[role=radio]` 而非 li；写交互断言前先查底层组件绑定位置。
6. **antd 老 rc- 组件 attrs 限制**：vc-slider 根元素只消费 `$attrs` 的 class/style，其余丢弃；透传测试统一用 class。
7. **antd 插槽语义差异**：Alert 默认插槽内容走 `description` 具名插槽；Tooltip 未 hover 时浮层不渲染。
8. **element Popover 与 Tooltip 插槽相反**：ElPopover 的触发元素必须放 `reference` 具名插槽，默认插槽是浮层内容（content prop 兜底）；ElTooltip 的触发元素走默认插槽。
9. **element-plus 2.14.6 在 happy-dom 下 ElForm validate() 有兼容性 bug**（async-validator promise 链卡死），element 校验类契约跳过，antd 正常。
10. **异步渲染**：element Select/Table 需 `await flushPromises()`；element Radio change 需 `await nextTick()`。
11. **跨端选择器技巧**：类名两端不同时用语义子串匹配（`[class*="close"]`、`[class*="dot"]`）；页码用 `findAll('li')` 精确文本匹配；antd Select size=default 无 sm/lg 类名只映射 middle。
12. **环境注意**：测试环境 happy-dom；Windows 下 shell 是 PowerShell，没有 tail/grep，不要用 Unix 管道命令。
13. **element-plus 顶层导出一律带 El 前缀**：如 `ElSteps`/`ElStep`，没有 `Steps` 导出；import 后出现 `Invalid vnode type: undefined` 先排查导出名。
14. **element Steps 状态类位置与时机**：`is-process`/`is-finish` 挂在 `.el-step__head` 而非根 `.el-step`；状态在子组件 `onMounted` 的 immediate watch 中计算，断言前必须 `await nextTick()`。
15. **antd BreadcrumbItem 的 href prop 不会渲染到 a 标签**（源码 createVNode 时漏拼），统一层用 Breadcrumb 的 `routes` + 自定义 `itemRender`（非末项返回 `h('a',{href:真实to})`）数据驱动。
16. **antd Collapse 未激活面板默认不渲染内容**（PanelContent 在 rendered=false 时直接 return null）；要让契约"未激活内容也在 DOM"成立，给每个 CollapsePanel 传 `forceRender:true`（内容以 v-show 隐藏）。
17. **Timeline mode 两端枚举不同**：element 是 `start|end|alternate|alternate-reverse`（且不接受空串），统一层沿用 antd 的 `''|left|right|alternate`，element 侧映射 `''/left→start`、`right→end`、`alternate→alternate`。
18. **Skeleton 差异**：element 动画类是 `is-animated`（prop `animated`），占位块为标题 1 + 段落 rows 共 `rows+1` 个 `.el-skeleton__p`；antd 动画类是 `ant-skeleton-active`（prop `active`），行数挂在 `paragraph:{rows}`。契约需按 libName 分支断言。
19. **antd 组件内部名规律**：antd-vue 组件 `name` 普遍带 A 前缀（AInputNumber、ADatePicker、ASteps、ACollapse…），但部分组件无前缀（Cascader、TreeSelect）；`findComponent({name})` 为空时先去 node_modules 组件文件里确认实际 name。
20. **InputNumber 细节**：element 增减按钮监听 `mousedown`（支持长按连增），测试 trigger('click') 无效；antd 内部 `StepHandler` 同样 mousedown 触发。断言 props 引用时注意底层会加工 options/data（reactive/normalize），数组类一律 `toEqual` 不用 `toBe`。
21. **DatePicker 字符串绑定**：两端默认绑定值都不是字符串（element 是 Date，antd 是 dayjs）；统一层必须传 `valueFormat`（antd）/`valueFormat`+`format`（element，同一格式串）让 v-model 绑定格式化字符串。
22. **DescriptionsItem 是标记组件不挂载实例**：双端 Descriptions 都是父组件读子项 props 自渲染行，`findAllComponents({ name })` 找不到 DescriptionsItem，只能断言渲染结果（文本 / `td[colspan]`）；且 element 会把行尾项 span 自动填充至整行，span 断言需用两项场景。
23. **element ElPopconfirm 的 emits 带校验**：`confirm: (e) => e instanceof MouseEvent`，契约里 `vm.$emit('confirm')` 无参会触发 `Invalid event arguments` 警告，需传 `new MouseEvent('click')`。
24. **antd Descriptions 4.x 无 items prop**：用 `Descriptions.Item`（= 导出的 DescriptionsItem）子节点模式；再次验证"先读 node_modules 实际定义"的必要性。
25. **先确认双端都存在该底层组件**：antd-vue 4.2.6 无 ColorPicker（antd React 5 的产物），动手前 `ls node_modules/{lib}/es` 确认目录存在。
26. **element Upload 无声明式 emits、无 update:fileList**：事件全走 onXxx props；契约里用 `inner.props('onChange')(args)` 直接调用最稳妥（绕过 emit 机制）；文件列表变化通过 onChange 归一化出 `update:modelValue`。
27. **多根组件的 class 断言**：element ElTimePicker 根节点含 teleport 注释是多根，`wrapper.classes()` 为空，逃生舱断言用 `wrapper.html()` contains。
28. **antd-vue 4.x Transfer 的 defaultRender 返回 null**：必须显式传 `render: (item) => item.title` 列表项才渲染文本；且 dataSource 字段是 `title`（统一层 label 需在适配器映射）。
29. **服务式组件（Message/Notification）测试残留**：契约用例调用的实例会残留在 `document.body`（duration 未过期），`querySelector` 可能命中旧实例；专属断言用 `querySelectorAll` + `find` 匹配本次文本。
30. **antd Select 系组件 placeholder 不在 input attribute**：AutoComplete/Select 把 placeholder 渲染为占位元素文本（`.ant-select-selection-placeholder`），element 是原生 input attribute；契约按 libName 分支断言。
31. **antd AutoComplete 无 fetchSuggestions 回调模式**：适配器内部 `ref options` + `onSearch`/`onFocus` 时调用统一层 fetchSuggestions 回写；且必须显式 `filterOption: false`（antd 默认 false），过滤逻辑由 fetchSuggestions 负责。
32. **element ElTree 无受控 checkedKeys**：只有 defaultCheckedKeys（非受控），受控同步靠 `watch + treeRef.setCheckedKeys()`；check 事件在 nextTick 后才 emit，适配器 onCheck 里用 `treeRef.getCheckedKeys()` 取最新值。
33. **Tree 勾选框交互目标不同**：element 是真实 `input[type=checkbox]`（`setValue(true)` 触发 change），antd 是 `span.ant-tree-checkbox`（click 触发）；契约用 `input.exists()` 分支处理。
34. **antd Tree/Transfer 展示字段是 title**：统一层 label 需映射（Tree 用递归 mapNodes）；antd `checkedKeys` 传了即受控，适配器默认 undefined 时跳过该 prop 保持非受控。
35. **element ElMention 下拉可见性依赖真实 focus**：`document.activeElement` 必须是输入框，VTU `trigger('focus')` 不改 activeElement，须 `input.element.focus()`；且 syncAfterCursorMove 有 `setTimeout(0)`，断言前 `await new Promise(r => setTimeout(r, 30))`。element mention 无 change 事件，用 input 归一化。
36. **UcMenu 点击目标差异**：element 子菜单标题的 click handler 在内层 `div.el-sub-menu__title`（li 上无 handler），antd 在 `li.ant-menu-submenu-title` 自身；叶子项两端 handler 都在 li。双端子菜单收起时子项仍在 DOM（v-show 隐藏，Transition stub 不影响），子列表选择器 element `ul.el-menu--inline` / antd `ul.ant-menu-sub`。
37. **antd-vue 4.2.6 Menu 的 keyPath 已是根→叶顺序**（源码 `keys=[...parentKeys,key]`），不要照搬 React antd 叶→根的旧认知做 reverse；选中类是 `ant-menu-item-selected`（无 active 子串），契约按 active|selected 兼容。antd vertical 统一模式映射为 inline。
38. **UcImage 预览与 fit 差异**：antd Image 的 `preview` 默认 true（element 需 previewSrcList 才有预览），统一层默认 false 时适配器必须显式传 preview；antd fit 无 prop 走 `style.objectFit`，style 合并后须从 attrs 剔除 style 防止 `...attrs` 覆盖；element 侧 preview 用 `previewSrcList=[src]`+`previewTeleported` 桥接。
39. **happy-dom 不实现 canvas 2d**：`document.createElement('canvas').getContext('2d')` 返回 null，Watermark 双端底层都在 `if(ctx)` 处整体跳过水印层绘制；这类用例用 `it.skipIf(!supportsCanvas)` 只在真实浏览器跑，prop 映射断言不受影响照常写。
40. **声明式 emits 的组件取不到 onX props**：如 ElCarousel 声明了 `emits:['change']`，`inner.props('onChange')` 是 undefined（Upload 那种"无声明式 emits"才可用 props 直调）；契约触发改用 `inner.vm.$emit('change', args)`。
41. **setup `expose()` 的命令式方法在 `vm.$.exposed`**：`wrapper.vm.setActiveItem` / `wrapper.vm.goTo` 取不到，spy 用 `vi.spyOn(inner.vm.$.exposed || inner.vm, method)`；适配器内 ref 绑到组件时拿到的是 exposed 代理，调用不受影响。
42. **Carousel 两端都只有初始 index 无受控 current**：element `initialIndex`+`setActiveItem(i)`，antd `initialSlide`+`goTo(i, true)`（第二参 dontAnimate 规避 happy-dom 过渡）；统一层 watch modelValue 调实例方法，并用 innerCurrent ref 防回环。
43. **Carousel 帧渲染坑**：element 在恰好 2 帧+loop+非 card 时 PlaceholderItem 机制会复制帧（4 个 `.el-carousel__item`），计数用 3 帧场景；antd infinite 追加 slick 克隆帧，原始帧选择器 `.slick-slide:not(.slick-cloned)`；antd 帧就是直接 div 子节点（无 Item 子组件），element 是 ElCarouselItem（name 传 String(key)）。
44. **Carousel prop 映射**：element `arrow:always|hover|never` / `indicatorPosition:'none'` 隐藏指示点 / `direction` / `trigger` / `height`；antd `arrows` 布尔（只有 always→true，hover 也 false）/ `dots` / `infinite`(=loop) / `dotPosition`(vertical→right)+`verticalSwiping` / `autoplaySpeed`(=interval)；`afterChange(current)` 无 prev，适配器内部 ref 维护 prevIndex 归一化 `change(current,prev)`；height/trigger antd 无能力不透传。
45. **element ElTourSteps 只挂载当前步骤**：源码 `return result[props.current]`，`findAllComponents({name:'ElTourStep'})` 永远只有 1 个实例（total 靠 vnode 计数），断言第二步 props 要 setProps current 切换后再找；antd Tour 是原生 steps 数组可直接断言长度。
46. **Tour 弹层测试**：双端都 Teleport/Portal 到 body，无 target 步骤居中渲染；happy-dom 下 `await flushPromises()` + `setTimeout(50)` 后标题描述可真实强断言（element `.el-tour__title`/`.el-tour__body span`，antd `.ant-tour-title`/`.ant-tour-description`），beforeEach/afterEach 清 document.body。
47. **antd Tour 归一化**：`showArrow→arrow`，无 `showClose`（关闭按钮恒显，统一层 prop 仅 element 生效不透传）；vc-tour 的 open 完全受控，`setMergedOpen(false)` 不会真关，适配器必须在 onClose 里自行 `emit('update:modelValue', false)`；完成时 vc-tour 先 onClose 后 onFinish，与 element finish（先 close 后 finish）顺序一致。
48. **ElAnchorLink 嵌套走 sub-link 具名插槽**：default 插槽是链接标题（fallback 为 title prop），子链接必须放 `{ 'sub-link': () => renderLinks(children) }`，且仅 vertical 方向渲染（antd horizontal 同样不支持 items#children，devWarning）；嵌套链接也是 ElAnchorLink 实例，findAllComponents 计数含子级。
49. **ElAnchor 的 "Slot invoked outside render function" 警告是底层既有**：源码 `watch(() => slots.default?.(), updateMarkerStyle)` 在 watch getter 里调插槽，直接用 ElAnchor 也告警，适配器无需处理也无法消除，测试照常通过。
50. **Anchor 事件双端归一化**：element 声明式 emits，click 还校验 `e instanceof MouseEvent`（契约 `$emit('click', new MouseEvent('click'), href)`）；element 参数 `(event, href)`，antd 是函数 prop `onClick(event, {href,title})`；统一为 `click(href, event)`，change 双端都是 href 单参。
51. **antd 函数式容器 prop 模式**（Affix `target`、Anchor `getContainer`）：统一层只暴露字符串 CSS 选择器，适配器转 `() => document.querySelector(s) || window`；契约先 appendChild 预置元素再断言 `inner.props('target')() === el`；未传选择器时**不要**覆盖 antd 默认函数（它默认返回 window）。
52. **Affix 差异**：element `offset`+`position(top|bottom)`+`target`(字符串)；antd 拆 `offsetTop`/`offsetBottom`，position=bottom 时另一 prop 必须是 undefined（不要同时传 0）。
53. **Space 差异**：antd 默认 size 是 small（8），档位 small 8/middle 16/large 24；element 默认 default（8/12/16），统一层默认 default 并在 antd 映射 middle；对齐 prop element 叫 `alignment` antd 叫 `align`；分隔符 element 是 `spacer` **prop** 且只接受单个 VNode（必须 `slots.separator()[0]`，传数组会走 createTextVNode 当文本），antd 是 `split` 具名插槽；fill/fillRatio element 独有，antd 侧不透传（props('fill') 断言 undefined）。
54. **函数式组件无实例**：antd Typography.Link（displayName=ATypographyLink）是 functional component，`findComponent` 找不到、不能 `inner.props()`，这类组件契约只走 DOM（`a.ant-typography`、类名、属性、trigger click）；VTU 对函数式组件取组件名用 displayName。
55. **antd Link 下划线是 `<u>` 标签不是类名**：wrapperDecorations 对 underline 渲染 `<u>` 包裹内容（del/code/mark 同理各是真实标签）；type 只支持 secondary/success/warning/danger，统一层 default/primary 在 antd 侧**不传** type。
56. **ElLink 的 boolean underline 已废弃**：传 true/false 会触发 useDeprecated 控制台告警且 true 被内部映射成 'hover'；统一层 underline 用字符串 `always|hover|never`（默认 hover）直映；element disabled 时 a 标签的 href/target 会被移除且不 emit click（antd 靠 pointer-events:none）。
57. **ElRow gutter 仅 number**：2.14.6 row.vue 直接 `props.gutter/2` 计算负 margin，传数组得 NaN；数组 [h,v] gutter、wrap=false、Col xxl/order/flex 都是 antd 单边能力，统一 API 不声明，经 attrs 逃生舱在 antd 侧可用。element Row 修饰类是 `is-justify-*`/`is-align-*`（ns.is），不是 el-row--xxx。
58. **Countdown 测试用假定时器**：element ElCountdown 基于 rAF、antd AStatisticCountdown 基于 setInterval(33ms)，契约 `beforeEach vi.useFakeTimers()` + afterEach unmount/restore，否则真实计时刷大量 change；element 的 rawValue 在 onMounted 内才计算，初始格式文本断言须 `await nextTick()`（首帧是 00:00:00）；antd 组件 emits 被注释掉，onFinish/onChange 走函数 props（`inner.props('onFinish')()`），element 走声明式 emits（`$emit`）；双端 10000ms 配 HH:mm:ss 渲染一致（00:00:10）。
59. **容器组件的"直接子 vnode 探测"会被包装层打断**：ElContainer 的 isVertical 靠 `slots.default().some(v => v.type.name === 'ElHeader' || v.type.name === 'ElFooter')` 自动判断；统一层子组件名是 UcLayoutHeader，探测必然失败。这类"父组件嗅探子组件类型"的机制（Container、可能还有其他复合组件）在包装架构下不可依赖，统一层必须把方向提升为显式 prop（UcLayout direction=vertical|horizontal，element 直传、antd 映射 hasSider）。对照：antd Layout 的 Sider 探测走 provide/inject（Sider onMounted 注册），可穿透包装层。
60. **element 尺寸 CSS 变量必须传带单位字符串**：ElHeader/ElFooter/ElAside 的 height/width 走 cssVarBlock 生成 `--el-header-height` / `--el-footer-height` / `--el-aside-width`，传 number 60 会序列化成无单位的 `60`，`height: var(...)` 解析无效；适配器统一 `toCssSize = v => typeof v === 'number' ? v + 'px' : v`。antd Header/Footer 无尺寸 prop，映射为 inline style（style 要与用户 attrs.style 合并并剔除 attrs 中的 style）；antd Sider 有原生 width prop，number 原样传即可。
61. **单边 attrs 要防止 DOM 属性污染**：antd Sider 的 collapsible/collapsed/collapsedWidth/breakpoint/theme/trigger/reverseArrow/onCollapse/onBreakpoint 等单边 props 经 attrs 落到 element ElAside 时，inheritAttrs 会把它们渲染成 `<aside collapsible="" breakpoint="lg">`。对底层只透传 DOM 的一侧，适配器要用 denylist 显式 `delete` 掉已知单边 key（含 on* 事件名）。
62. **一端缺失组件的新范式（用户决策，优先级高于"双端都存在才实现"旧惯例）**：某组件只在一个底层库存在时，**缺失端在 `adapters/{lib}/` 内用原生 Vue/DOM 写兜底实现**（第十八梯队 Scrollbar/Splitter：antd 4.2.6 没有，element 有）。约束：不引第三方库；兜底组件仍是普通 defineComponent（不 import 缺失库）；DOM 类名用 `uc-` 前缀但 BEM 后缀与存在端对齐（如 `.uc-splitter-bar__dragger`），契约用 isElement 三元选选择器；公共 CSS 抽 `adapters/antd/native-styles.js`，用 `injectOnce(id, css)` 向 document.head 注入一次（先判 typeof document/head，happy-dom 安全跳过）。
63. **ElSplitter 面板收集可穿透包装、bar 渲染需 nextTick**：useOrderedChildren 用 flattedChildren 递归 `child.component?.subTree`，UcSplitterPanel 包装不影响收集（与第 59 条 ElContainer 的直接子探测相反）。面板索引在 ElSplitter `watch(panels)` 里 setIndex，mount 同步返回时所有 bar 还是 v-if 注释（原生直用也一样），antd 兜底面板注册同样需要一次 flush——所有 bar 断言/拖拽交互前 `await nextTick()`。
64. **ElSplitter 折叠图标有尺寸前提，容器尺寸走 ResizeObserver**：usePanel.isCollapsible 实际是三条件（`panel.collapsible.end && size>0`、`next.collapsible.start && nextSize===0 && size>0`，grep 输出易漏第三段），happy-dom 零布局下图标一个都不显示。useContainer 用 @vueuse useElementSize（ResizeObserver 回调写 width，不读 getBoundingClientRect），happy-dom 不派 RO 回调；测试须在**挂载前** `vi.stubGlobal('ResizeObserver', class{ constructor(cb){this.cb=cb} observe(t){this.cb([{target:t,contentRect:{width:400,height:300}}])} unobserve(){} disconnect(){} })`，afterEach vi.unstubAllGlobals()。
65. **Splitter 真实拖拽测试**：antd 兜底用 dispatchEvent(new MouseEvent('mousedown'/'mousemove'/'mouseup', {clientX}))（move/up 派发到 window）；坐标必须 `e.clientX ?? e.pageX`——happy-dom 的 pageX 恒 0，`pageX ?? clientX` 会被 0 短路导致 delta 恒 0；两个面板的 getBoundingClientRect 都要 vi.spyOn mock 宽高；move 后的 is-active/mask/ghost 样式断言要 await nextTick；尺寸空间守恒（a=b=200、delta+40 → [240,160]，契约别写错成 [240,260]）。
66. **Splitter collapse 语义两端对齐 element**：useResize.onCollapse 中 end 折叠 index+1，且其尺寸**并入** index（[100,100]→[200,0]，不是留空 [100,0]），start 反之；再次触发按 **bar 索引**缓存恢复并 clamp 到两侧当前总和。兜底实现的折叠决策基于内部 pxSizes 数组，不要基于实时 rect（测试里 rect mock 不会随折叠变 0）。lazy 语义也要对齐：拖拽中只更新 ghostOffset 不 emit resize，mouseup 才一次性应用并 emit resize-end。
67. **兜底渲染函数的 class/style 合并 & ElSplitterPanel collapsible 上游 bug**：`h('div',{class:'x',...attrs})` 中 attrs 展开在同名 key 之后会整体覆盖基础类，必须解构出 class/style 后用数组/对象数组显式合并。happy-dom 会把 `flex:0 0 30%` 序列化成 flex-grow/flex-shrink/flex-basis 三条长属性，style 断言写 `flex-basis: 30%`。另：element split-panel.mjs 的 `collapsible: Boolean` 是上游类型声明 bug，运行时 getCollapsible 支持 `{start,end}`，对象形式功能正常但有 Vue 类型告警，专属用例局部 spyOn(console,'warn') 屏蔽并注释。
68. **Group 类组件 provide 穿透优先级两端相反，统一靠 cloneVNode 注入**：element 的 useFormSize 链 `props.size || groupCtx.size || ...`、ElAvatar `props.size ?? groupCtx?.size` 都是 **props 优先**，而 UcButton/UcAvatar 恒显式传默认档位（'default'/'circle'），父 Group 的 provide 被永久遮挡；antd 相反（AButton `compact||groupCtx.size||props.size`，AAvatar 以 `props.size==='default'` 为哨兵走 ctx、shape 为 ctx 优先），包装不挡。做法：Group 适配器 `slots.default()` 时遍历直接子 vnode，`vnode.type?.name === 'UcXxx'` 的用 `cloneVNode(vnode, { size, type/shape, ... })` 注入**非默认值**，其余原样返回；底层 Group 组件的对应 prop 仍正常传（影响容器类/折叠计数等自身行为）。
69. **ElAvatarGroup 字符串 size 必告警（上游裸 props bug）**：avatar-group-props.mjs 没用 buildProps 包裹，Vue 原生校验只执行 `validator: isNumber`，`values: componentSizes` 被忽略——传 large/small/default 一定 warn，功能与 provide 均正常。element 专属 spec 顶层 `beforeEach(() => vi.spyOn(console,'warn').mockImplementation(()=>{}))` 屏蔽并注释（同 67 条范式）。另：ElButtonGroup type 默认值经 VTU props() 解析是 `''`（buttonProps.type default ''）不是 undefined。
70. **antd PageHeader 适配要点**：renderBack 中 `if (!backIcon || !props.onBack) return null`——不传 onBack 就**不渲染返回按钮**（element 恒渲染），统一层要求双端恒渲染，antd 适配器必须恒传 `onBack: () => emit('back')`（无参箭头同时保证 emitted back 无参，吞掉 antd 的 MouseEvent）；统一层 content 在 antd 映射 `subTitle`，icon 插槽映射 `backIcon`；ghost 是 antd 单边能力（element 不透传，断言 inner.props('ghost') 为 undefined）。
71. **AvatarGroup 折叠 prop 与 "+N" 文本差异**：element 传 max 要同时给 `collapseAvatars:true + maxCollapseAvatars:max`（后者默认 1），折叠头是 ElTooltip 包裹的 ElAvatar，文本 '+ N' 有空格；antd 是 `maxCount + maxPopoverPlacement`，折叠头是 Popover 包裹的 AAvatar，文本 `+${n}` 无空格。契约统一用 `.text().replace(/\s/g,'') === '+2'`；折叠后组内 DOM 头像数 = max+1（浮层内容懒挂载/teleport，不计入 findAllComponents）。
72. **antd ButtonGroup/AvatarGroup 能力边界**：AButtonGroup 只 provide GroupSizeContext（无 type provide），size default→middle，lg/sm 才挂容器类（middle 无类），**无垂直方向**（direction element 单边，antd 不透传也不映射）；`Button.Group` / `Avatar.Group` 即具名导出 ButtonGroup/AvatarGroup，组件名 AButtonGroup/AAvatarGroup。
73. **VTU DOMWrapper 没有 getAttribute()**：本版 @vue/test-utils 的 DOMWrapper 只有 `.attributes(name)`，调用 getAttribute 报 TypeError。读 style 统一 `wrapper.find(sel).attributes('style') || ''`（无 style 时返回 undefined）；组件 wrapper 的 `.attributes()` 返回 $attrs，可用于断言函数式组件/未声明 props 的透传。
74. **happy-dom 窗口滚动要用 window.scrollTo，不能 defineProperty(scrollY)**：`window.dispatchEvent(new Event('scroll'))` 的 `e.target` 是 happy-dom 内部 GlobalWindow，与测试全局 `window` 代理不是同一对象（`e.target===window` 为 false），在代理上 defineProperty 的 scrollY 对 antd `getScroll(e.target)` 不可见。BackTop 类契约：antd 侧 `window.scrollTo(0,300)`（内部 scrollY 同步更新）再派发 scroll，afterEach `window.scrollTo(0,0)` 复位；element 侧监听 document，`Object.defineProperty(document.documentElement,'scrollTop',{value:300,configurable:true})` + document 派发 scroll 有效，afterEach delete。window 是 happy-dom 自有 EventTarget（proto 是 Object），不能 spyOn(window,'addEventListener')，要监听需先包装。
75. **happy-dom CSSOM 丢弃 -webkit- 私有声明**：inline style 对象里的 `WebkitLineClamp` / `-webkit-line-clamp` 经 happy-dom 序列化后直接消失（element ElText 自身生成的也一样），契约不能断言 style 含 -webkit-line-clamp；改为断言同时下发的标准属性（如 `overflow: hidden`）或 `findComponent(...).props('lineClamp')`。
76. **Transition 根组件不转发 class/style（fallthrough 失效家族新成员）**：ElBacktop 根 vnode 是 Transition（内部 div 才是 v-if 子节点），attrs.class/style 不会落到按钮；ElBacktop 又不像 ElDialog 有 class prop。解法：适配器解构 `const {class:klass,style:userStyle,...rest}=attrs`，包一层 `h('div',{class:klass,style:userStyle},[h(ElBacktop,{...rest},slots)])`（fixed 子元素相对视口定位不受影响），契约按 isElement 分支断言 `.my-x` 包裹节点存在、antd 断言类落按钮。
77. **BackTop 双端显隐/节流/默认值差异**：element ElBacktop 是 **v-if**（隐藏时 DOM 不存在，用 exists() 断言）+ useThrottleFn(300, leading=true) 首次滚动同步执行；antd BackTop 即 FloatButton.BackTop（具名导出 BackTop，内部名 ABackTop）是 **v-show**（按钮恒在 DOM，用 isVisible() 断言）+ throttleByAnimationFrame **首次也延迟一帧**（滚动后需 setTimeout(60)+nextTick；组件自身的 scroll 监听也在 onMounted→nextTick→rAF 后才绑，挂载后先等再触发）。antd 上游 visibilityHeight 默认 **400** 与 element 200 不一致，统一默认 200 由适配器强制下发；right/bottom element 是原生 prop，antd 无能力，桥接成 inline style 数组与用户 style 合并；target 同第 51 条字符串→getContainer 函数（空=()=>window）。
78. **antd FloatButton 默认插槽语义错位**：`.ant-float-btn` 的 default 插槽是 description（仅 shape=square 时显示），图标位是 **icon 插槽**；UcBacktop 默认插槽自定义按钮内容时，antd 适配器要映射成 `{ icon: () => slots.default?.(), default: undefined }`（element ElBacktop 默认插槽就是按钮内容，无此问题）。
79. **antd TypographyText 是函数式组件**：Text 与 Link（第 54 条）一样 findComponent 找不到，透传 props 断言要找内部 TypographyBase（有 name）；type 映射 `info→secondary`（default→undefined 不透传），truncated→`ellipsis:true`（挂 ant-typography-ellipsis-single-line 类）；lineClamp 不能用 ellipsis:{rows}——Text 渲染时 rows 被强制剥离，改用原生 CSS 桥（display:-webkit-box + WebkitBoxOrient:'vertical' + overflow:hidden + WebkitLineClamp:N），且断言见第 75 条；size/tag 是 element 单边（ElText 用 resolveDynamicComponent 渲染 tag），antd Text 强制 span 不透传。ACheckableTag（.ant-tag-checkable/-checked，组件名 ACheckableTag）**无 disabled/无 type**：disabled 由适配器拦截 onChange 并给 inline style（cursor:not-allowed;opacity:0.5），disabled/type 要从 attrs 解构剔除避免污染 span。
80. **RadioGroup/CheckboxGroup 的 size 类位置两端不同**：element 的 size 经 provide 下发到子项 label（`.el-radio--small`），group 根 div 无修饰类；antd 在 group 根拼 `${prefixCls}-group-${size}` 且是**全称**（`.ant-radio-group-small`/`-large`，不是 Segmented 那种 `-sm`/`-lg` 缩写——不同组件类名规则不同，先读源码再断言）。element 双 Group（radio-group.mjs/checkbox-group.mjs）都原生支持 `options` 数组数据驱动 + `type:'button'` 切按钮形态，适配器直接透传即可，不用递归子组件。
81. **antd 双 Group 的 change 参数类型不同**：RadioGroup emit 事件对象（归一化取 `e.target.value`），CheckboxGroup 直接 emit 值数组（直传）；element 双 Group 的 change 都在 `nextTick` 后 emit（changeEvent 内 `nextTick(() => emit('change'))`），交互断言必须 `await nextTick()`。element Radio 的 input 用 vModelRadio 指令 + 静态 `checked` attribute 绑定，`element.checked` 可读。
82. **antd CheckboxGroup 无 size/min/max/按钮形态**：checkboxGroupProps 只收 `name/options/disabled/value/id/defaultValue`（antd-vue 4.2.6 无 CheckboxButton）。统一层仍显式声明 min/max（element 原生支持），antd 适配器**声明后丢弃不透传**（不透传就不会经 attrs 落成 DOM 属性污染），契约不断言 antd 侧 min/max。
83. **MessageBox 服务式 Promise 桥接**：element ElMessageBox.confirm/alert 原生返回 Promise（确认 resolve('confirm')，取消/关闭 reject('cancel')）；antd Modal.confirm/info 是回调式（onOk/onCancel），适配器必须 `new Promise((resolve,reject) => Modal.confirm({...,onOk:()=>resolve('confirm'),onCancel:()=>reject('cancel')}))`。antd 无 alert 单按钮形态：alert 按 type 分发 `Modal[type]`（success/warning/error/info，info 系列天然单按钮），无 type 用 Modal.info。契约里调用后挂 `p.catch(()=>{})` 防 unhandled rejection 误报；destroyAll 映射 element ElMessageBox.close() / antd Modal.destroyAll()。
84. **VTU 2 顶层挂载选项 onXxx 不传给组件**：`mount(UcXxx, { 'onUpdate:modelValue': fn })` 的顶层 onXxx 监听器根本不会传给组件实例（createInstance 只把 options.props/attrs/propsData 合入响应式 props），spy.calls 恒 0 且**不报任何错**，极易误判为"组件没 emit"。v-model 载体监听器必须放 `props: { 'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }) }` 内（wrapper 用 let 先声明，回调里再引用）。
85. **detached 挂载下 happy-dom 不更新 document.activeElement，且原生 focus() 不派发事件**：焦点位置断言（如 OTP 第 N 格 activeElement 是哪个 input）必须 mount 时 `attachTo: document.body`（afterEach 清理 body）；focus/blur 事件改用 VTU `trigger('focus')`/`trigger('blur')` 确定性派发，`input.element.focus()` 在 happy-dom 下不保证派发 focus 事件。
86. **antd Select 把 '' 视为已有值吞掉 placeholder**：Select 系桥接组件（TimeSelect 等）统一层 modelValue 默认必须 `undefined` 而非 `''`，否则 antd 侧 placeholder 不渲染（element 侧空串无碍）；"可空字符串值"的统一 API 默认值一律优先 undefined。
87. **element 2.14 新版 Select 的 placeholder 是占位 span 文本**（`.el-select__placeholder`），不是 input 的 placeholder attribute（antd 是 `.ant-select-selection-placeholder` 占位元素文本）；placeholder 断言双端统一 `expect(wrapper.text()).toContain('xxx')` 最省事。
88. **element TimeSelect 的 minTime/maxTime 边界本身 disabled**：源码比较是 `time <= minTime || time >= maxTime`（闭边界排除，min/max 自己也灰）；antd 桥接 buildTimeOptions 的 disabled 条件按同语义写（`(minM != null && current <= minM) || (maxM != null && current >= maxM)`），契约别按"边界可选"的直觉改期望值。
89. **antd Flex 全值类名族与 element 兜底内联样式**：AFlex 为 justify/align/wrap 的每个合法 CSS 值生成全值类（`ant-flex-justify-center`/`ant-flex-align-center`/`ant-flex-wrap-wrap`），gap 档位走 `ant-flex-gap-{small|middle|large}` 类、数字走内联 `gap:Npx`；vertical 且未传 align 时自带 `ant-flex-align-stretch`。element 兜底全内联 style（display/flex-direction/flex-wrap/justify-content/align-items/gap/flex），断言按 isElement 分支；flex 简写经 happy-dom 序列化展开为 flex-grow/flex-shrink/flex-basis 长属性（第 61 条同款），契约断言长属性（flex:auto → `flex-grow:1` + `flex-basis:auto`）。
90. **element ElInputTag 清空按钮有 hover/focus 显示条件**：showClear = `clearable && !disabled && !readonly && (有值||有输入) && (isFocused||hovering)`，detached 挂载下直接 find 不到 `.el-input-tag__clear`，测试先 `w.find('.el-input-tag').trigger('mouseenter')` 再断言/点击。清空 emit 的是 `undefined` 不是 `[]`，统一适配器 `v ?? []` 归一化（双端一致）。antd Select tags 模式 value=`[]` 不吞 placeholder（与 `''` 不同，见第 86 条），可直接默认 `() => []`。
91. **antd List renderItem 数据驱动与 extra vnode**：AList 的 `renderItem` 既可函数 prop 也可插槽，函数 prop 直接传最稳；AListItem 的 `extra` 是 vnode prop（horizontal 布局 cloneElement 内联渲染、无 marker 类），统一层包 `h('span',{class:'uc-list-item-extra'})` 后契约可用统一选择器；AListItemMeta 的 title/description/avatar 全空时 meta-content 整段不渲染。antd List **bordered 默认 false、split 默认 true**（initDefaultProps），统一默认对齐 antd；size 直收 default/small/large（default 无类名）。
92. **运行时切库（playground）**：`getCurrentInstance()` 内部 instance 上没有 `.app` 属性，取 Application 要用 `inst.appContext.app`；`applyLib(app, lib)` 重注册全局组件后，已渲染 vnode 不会自动换实现，需对子树加 `:key="tick"` 强制重建；服务式 API（$message 等）在业务代码里不要 setup 时缓存，调用时从 `proxy.$message` 现取。切库后未 key 的区域（如侧栏切库器自身）因组件身份变化会整体换肤，属预期。
93. **playground 侧边导航自动收集**：section 标题收集用 `querySelectorAll` + 已有 id 保留（`sec.id || 'pg-sec-' + index`，勿覆盖锚点演示用的 id）；滚动高亮用 IntersectionObserver（rootMargin `-72px 0px -70% 0px`），切库重渲染后必须重新收集+重新 observe；section 加 `scroll-margin-top` 抵消 sticky 偏移。

## 完成判定

- 批次内每个组件双端 spec 全过，全量测试无回归。
- 两个 index.js 均已注册，playground 可交互。
- project_memory 已更新组件清单与新踩坑。
