import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { setupDevtoolsPlugin } from './devtools'
import { setupUnocss } from './unocss'
import { setupUnplugin } from './unplugin'
import progress from 'vite-plugin-progress'
import { setupHtmlPlugin } from './html'

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    vue(),
    setupDevtoolsPlugin(viteEnv),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime),
  ]

  return plugins
}
