/** 应用的全局命名空间 */
declare namespace App {
  /** 主题命名空间 */
  namespace Theme {
    type ColorPaletteNumber = import('@sa/color').ColorPaletteNumber

    interface OtherColor {
      info: string
      success: string
      warning: string
      error: string
    }

    interface ThemeColor extends OtherColor {
      primary: string
    }

    interface ThemeSettingTokenColor {
      /** 如果未设置进度条颜色，则将使用主色 */
      nprogress?: string
      container: string
      layout: string
      inverted: string
      'base-text': string
    }

    interface ThemeSettingTokenShadow {
      header: string
      sider: string
      tab: string
    }

    type ThemeColorKey = keyof ThemeColor

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor

    // 描述 “主题 token（设计变量）” 的类型
    type ThemeTokenCSSVars = {
      colors: ThemeTokenColor & { [key: string]: string }
      boxShadow: ThemeSettingTokenShadow & { [key: string]: string }
    }
  }

  /** 服务命名空间 */
  namespace Service {
    /** 其它 baseURL 键 */
    type OtherBaseURLKey = 'demo'

    interface ServiceConfigItem {
      /** 后端服务 baseURL */
      baseURL: string
      /** 需要代理到该服务的路径匹配规则 */
      proxyPattern: string
    }

    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey
    }

    interface ServiceConfig extends ServiceConfigItem {
      /** 其它后端服务配置 */
      other: OtherServiceConfigItem[]
    }

    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
      other: Record<OtherBaseURLKey, string>
    }
  }
}
