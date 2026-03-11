import process from 'node:process'
import path from 'node:path'
import unocss from 'unocss/vite'
import { presetIcons } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export function setupUnocss(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

  /** 本地图标路径 */
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon')

  /** 本地图标集的名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(
    `${VITE_ICON_PREFIX}-`,
    '',
  )

  return unocss({
    presets: [
      // 配置图标预设
      // https://unocss.dev/presets/icons#options
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: 'inline-block',
        },
        collections: {
          // 读取本地图标集
          [collectionName]: FileSystemIconLoader(localIconPath, (svg) =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
          ),
        },
        // 当匹配到缺失的图标时发出警告
        warn: true,
      }),
    ],
  })
}
