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
  }
})
