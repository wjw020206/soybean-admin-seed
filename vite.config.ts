import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins } from './build/plugins'
import { getBuildTime } from './build/config'

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  /** Vite 环境变量 */
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as Env.ImportMeta

  /** 构建时间 */
  const buildTime = getBuildTime()

  /** 是否启用代理 */
  // const isEnableProxy = configEnv.command === 'serve' && !configEnv.isPreview

  return {
    plugins: setupVitePlugins(viteEnv, buildTime),
  }
})
