// element 侧无对应底层组件时的原生兜底样式（element-plus 2.14.6 无 FloatButton）
// 与 antd 侧 native-styles.js 同一机制：仅在浏览器环境注入一次，happy-dom/SSR 下安全跳过
function injectOnce(id, css) {
  if (typeof document === 'undefined' || typeof document.head === 'undefined') return
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = css
  document.head.appendChild(style)
}

export function ensureListStyle() {
  injectOnce(
    'uc-list-style',
    `
.uc-list{position:relative;box-sizing:border-box;font-size:14px;line-height:1.5715;color:rgba(0,0,0,.88)}
.uc-list-split .uc-list-item{border-bottom:1px solid #f0f0f0}
.uc-list-split .uc-list-item:last-child{border-bottom:none}
.uc-list-bordered{border:1px solid #d9d9d9;border-radius:8px}
.uc-list-header,.uc-list-footer{padding:12px 16px;color:rgba(0,0,0,.88)}
.uc-list-bordered .uc-list-header{border-bottom:1px solid #d9d9d9}
.uc-list-bordered .uc-list-footer{border-top:1px solid #d9d9d9}
.uc-list-items{margin:0;padding:0;list-style:none}
.uc-list-item{display:flex;align-items:flex-start;justify-content:space-between;column-gap:16px;padding:12px 16px;color:rgba(0,0,0,.88)}
.uc-list-item-meta{display:flex;flex:1;align-items:flex-start;column-gap:16px;max-width:100%}
.uc-list-item-meta-avatar{flex:none}
.uc-list-item-meta-avatar img{display:block;width:32px;height:32px;border-radius:50%;object-fit:cover}
.uc-list-item-meta-content{flex:1 0}
.uc-list-item-meta-title{margin:0;color:rgba(0,0,0,.88);font-weight:400;font-size:14px;line-height:1.5715}
.uc-list-item-meta-description{color:rgba(0,0,0,.45);font-size:14px;line-height:1.5715}
.uc-list-item-content{flex:1;color:rgba(0,0,0,.88)}
.uc-list-item-action{display:flex;align-items:center;margin:0;padding:0;list-style:none;flex:none}
.uc-list-item-action li{padding:0 8px;color:rgba(0,0,0,.45);font-size:14px;line-height:1.5715;text-align:center}
.uc-list-item-action-split{display:block;width:1px;height:14px;background:#f0f0f0}
.uc-list-item-extra{flex:none;margin-inline-start:16px;color:rgba(0,0,0,.45)}
.uc-list-empty-text{padding:16px;color:rgba(0,0,0,.25);font-size:14px;text-align:center}
.uc-list-sm .uc-list-item{padding:8px 16px;font-size:12px}
.uc-list-lg .uc-list-item{padding:16px 24px;font-size:16px}
.uc-list-vertical .uc-list-item{display:block}
.uc-list-vertical .uc-list-item-extra{margin-inline-start:0}
.uc-list-spinning{padding:16px;color:rgba(0,0,0,.45);text-align:center}
`,
  )
}

export function ensureFloatButtonStyle() {
  injectOnce(
    'uc-float-button-style',
    `
.uc-float-btn{position:fixed;right:40px;bottom:40px;z-index:1000;box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border:1px solid transparent;border-radius:50%;background:#fff;color:#15417e;box-shadow:0 3px 6px -4px rgba(0,0,0,.12),0 6px 16px 0 rgba(0,0,0,.08),0 9px 28px 8px rgba(0,0,0,.05);cursor:pointer;font-size:14px;line-height:1;transition:color .2s,background-color .2s,border-color .2s,box-shadow .2s}
.uc-float-btn:hover{color:#4096ff;border-color:#4096ff}
.uc-float-btn-primary{background:#1677ff;color:#fff;border-color:#1677ff}
.uc-float-btn-primary:hover{background:#4096ff;color:#fff;border-color:#4096ff}
.uc-float-btn-square{border-radius:8px}
.uc-float-btn-body{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-width:0;min-height:0}
.uc-float-btn-icon{display:inline-flex;align-items:center;justify-content:center;font-size:18px}
.uc-float-btn-description{font-size:12px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:88px}
`,
  )
}
