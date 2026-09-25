// antd 侧无对应底层组件时的原生兜底样式（ant-design-vue 4.2.6 无 Scrollbar/Splitter）
// 仅在浏览器环境注入一次，类名与 element 结构对齐（uc- 前缀），happy-dom/SSR 下安全跳过
function injectOnce(id, css) {
  if (typeof document === 'undefined' || typeof document.head === 'undefined') return
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = css
  document.head.appendChild(style)
}

export function ensureScrollbarStyle() {
  injectOnce(
    'uc-scrollbar-style',
    `
.uc-scrollbar{position:relative;overflow:hidden}
.uc-scrollbar__wrap{overflow:auto;height:100%;box-sizing:border-box}
.uc-scrollbar__view{display:block}
.uc-scrollbar__wrap--hidden-default{scrollbar-width:thin;scrollbar-color:rgba(144,147,153,.35) transparent}
.uc-scrollbar__wrap--hidden-default::-webkit-scrollbar{width:8px;height:8px}
.uc-scrollbar__wrap--hidden-default::-webkit-scrollbar-thumb{background:rgba(144,147,153,.35);border-radius:4px}
.uc-scrollbar__wrap--hidden-default::-webkit-scrollbar-thumb:hover{background:rgba(144,147,153,.5)}
.uc-scrollbar__wrap--hidden-default::-webkit-scrollbar-track{background:transparent}
.uc-scrollbar__wrap--always{overflow:scroll}
`,
  )
}

export function ensureInputOtpStyle() {
  injectOnce(
    'uc-input-otp-style',
    `
.uc-input-otp{display:inline-flex;align-items:center;gap:4px}
.uc-input-otp__input-field{display:inline-flex}
.uc-input-otp__input{box-sizing:border-box;width:32px;height:40px;padding:0;text-align:center;font-size:16px;color:rgba(0,0,0,.88);background:#fff;border:1px solid #d9d9d9;border-radius:6px;outline:none;transition:border-color .2s,box-shadow .2s}
.uc-input-otp__input:focus{border-color:#1677ff;box-shadow:0 0 0 2px rgba(22,119,255,.1)}
.uc-input-otp__input:disabled{cursor:not-allowed;color:rgba(0,0,0,.25);background-color:rgba(0,0,0,.04);border-color:#d9d9d9}
.uc-input-otp__input:read-only{cursor:default}
`,
  )
}

export function ensureSplitterStyle() {
  injectOnce(
    'uc-splitter-style',
    `
.uc-splitter{display:flex;width:100%;height:100%;overflow:hidden}
.uc-splitter__vertical{flex-direction:column}
.uc-splitter-panel{overflow:auto;position:relative;box-sizing:border-box}
.uc-splitter-bar{position:relative;flex:0 0 auto;display:flex;align-items:center;justify-content:center;z-index:1}
.uc-splitter-bar__dragger{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;background:transparent;color:#909399;font-size:10px;user-select:none;transition:background-color .2s}
.uc-splitter-bar__dragger-horizontal{width:16px;height:100%;margin:0 -8px;cursor:ew-resize;touch-action:none}
.uc-splitter-bar__dragger-vertical{width:100%;height:16px;margin:-8px 0;cursor:ns-resize;touch-action:none}
.uc-splitter-bar__dragger:hover,.uc-splitter-bar__dragger.is-active{background:rgba(144,147,153,.25)}
.uc-splitter-bar__dragger.is-disabled{cursor:auto}
.uc-splitter-bar__dragger.is-disabled:hover{background:transparent}
.uc-splitter-bar__collapse-icon{position:absolute;z-index:2;width:16px;height:16px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #dcdfe6;border-radius:50%;cursor:pointer;color:#606266;line-height:1;font-size:10px}
.uc-splitter__horizontal .uc-splitter-bar__horizontal-collapse-icon-start,.uc-splitter__horizontal .uc-splitter-bar__horizontal-collapse-icon-end{top:50%;transform:translateY(-50%)}
.uc-splitter__horizontal .uc-splitter-bar__horizontal-collapse-icon-start{left:-8px}
.uc-splitter__horizontal .uc-splitter-bar__horizontal-collapse-icon-end{right:-8px}
.uc-splitter__vertical .uc-splitter-bar__vertical-collapse-icon-start{top:-8px}
.uc-splitter__vertical .uc-splitter-bar__vertical-collapse-icon-end{bottom:-8px}
.uc-splitter__mask{position:absolute;inset:0;z-index:10}
.uc-splitter--moving{user-select:none}
`,
  )
}
