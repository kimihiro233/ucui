import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 库构建配置（npm run build）
// 产物：dist/core.{js,cjs} + dist/element.{js,cjs} + dist/antd.{js,cjs}（共享代码自动拆 chunk）
// vue / element-plus / ant-design-vue 全部 external，由消费方以 peerDependencies 提供
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: {
        core: 'src/core/index.js',
        element: 'src/adapters/element/index.js',
        antd: 'src/adapters/antd/index.js',
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'vue',
        /^@vue\//,
        'element-plus',
        /^@element-plus\//,
        'ant-design-vue',
        /^@ant-design\//,
      ],
      output: {
        exports: 'named',
      },
    },
  },
})
