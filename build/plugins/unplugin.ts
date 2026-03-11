import process from 'node:process'
import path from 'node:path'
import type { PluginOption } from 'vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export function setupUnplugin(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

  /** 本地图标路径 */
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon')

  /** 本地图标集的名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(
    `${VITE_ICON_PREFIX}-`,
    '',
  )

  const plugins: PluginOption[] = [
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, (svg) =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
        ),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        ElementPlusResolver({
          // 不导入样式，完整导入请查看 /src/plugins/assets.ts
          importStyle: false,
        }),
        IconsResolver({
          customCollections: [collectionName],
          componentPrefix: VITE_ICON_PREFIX,
        }),
      ],
    }),
    createSvgIconsPlugin({
      // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md#%E4%BD%BF%E7%94%A8
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__',
    }),
  ]

  return plugins
}
