import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins } from './build/plugins'
import { getBuildTime } from './build/config'
import { createViteProxy } from './build/config/proxy'

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  /** Vite 环境变量 */
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as Env.ImportMeta

  /** 构建时间 */
  const buildTime = getBuildTime()

  /** 是否启用代理 */
  const isEnableProxy = configEnv.command === 'serve' && !configEnv.isPreview

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/scss/global.scss" as *;`,
        },
      },
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    // 定义全局变量替换规则，这些条目将在开发阶段定义在窗口中，并在构建阶段进行替换
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: createViteProxy(viteEnv, isEnableProxy),
    },
    preview: {
      port: 9725,
    },
    build: {
      // 启用/禁用 gzip 压缩文件大小报告（禁用此功能可能会提高大型项目的构建性能）
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SOURCE_MAP === 'Y',
      commonjsOptions: {
        // 不忽略 try...catch 中的 require()，确保这些依赖也能被正确解析和打包
        ignoreTryCatch: false,
      },
    },
  }
})
