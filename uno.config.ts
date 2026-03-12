import {
  defineConfig,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetSoybeanAdmin } from '@sa/uno-preset'
import type { Theme } from '@unocss/preset-wind3'
import { themeVars } from './src/theme/vars'

export default defineConfig<Theme>({
  // 可提取为实用工具使用情况的资源选项。
  content: {
    // 用于筛选是否从构建工具的转换管道中提取特定模块的过滤器
    pipeline: {
      exclude: ['node_modules', 'dist'],
    },
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem', // 14px
      'icon-small': '1rem', // 16px
      icon: '1.125rem', // 18px
      'icon-large': '1.5rem', // 24px
      'icon-xl': '2rem', // 28px
    },
  },
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm',
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind3({
      dark: 'class',
    }),
    presetSoybeanAdmin(),
  ],
})
