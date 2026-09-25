# 服务式 API

消息、通知、确认框以「服务」形式提供，不占模板位置。`app.use(UcUI)` 后通过全局属性使用，双端语义已归一。

## UcMessage（$message）

```ts
const { proxy } = getCurrentInstance()

proxy.$message.success('保存成功')
proxy.$message.error('保存失败')
proxy.$message.warning('内容即将丢失')
proxy.$message.info('已同步')
```

第二参数透传底层库 options（如 `{ duration: 3000 }`）。

## UcNotification（$notification）

```ts
proxy.$notification.success('标题', '通知正文')
proxy.$notification.warning('磁盘告警', '可用空间不足 10%')
```

## UcMessageBox（$messageBox）

```ts
// confirm：确定 → resolve('confirm')，取消 → reject('cancel')
proxy.$messageBox
  .confirm('确定删除这条记录吗？', '删除确认', { type: 'warning' })
  .then(() => console.log('confirmed'))
  .catch(() => console.log('canceled'))

// alert：单按钮提示，resolve('confirm')
await proxy.$messageBox.alert('操作已完成', '提示', { type: 'success', confirmText: '知道了' })
```

支持选项：`type`（'info' | 'success' | 'warning' | 'error'）、`confirmText`、`cancelText`；`destroyAll()` 关闭全部实例。

## 行为对齐说明

| 差异点 | 处理方式 |
| --- | --- |
| element 用 `ElMessage` 函数族，antd 用 `message` 函数族 | 适配器归一为同名方法集 |
| antd Modal.confirm 语义 | 归一为 confirm/alert Promise 语义 |
| 挂载名 | `UcMessage → $message`（去 Uc 前缀 + 小写） |
