/**
 * 命名空间 Env
 *
 * 用于声明 import.meta 对象的类型
 */
declare namespace Env {
  /** 路由模式 */
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  /** import.meta 的类型 */
  interface ImportMeta extends ImportMetaEnv {
    /** 应用的基本 URL */
    readonly VITE_BASE_URL: string
    /** 应用的标题 */
    readonly VITE_APP_TITLE: string
    /** 应用的描述 */
    readonly VITE_APP_DESC: string
    /** 路由模式 */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode
    /** iconify 图标的前缀 */
    readonly VITE_ICON_PREFIX: 'icon'
    /**
     * 本地图标的前缀
     *
     * 此前缀以 VITE_ICON_PREFIX 前缀开头
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'icon-local'
    /** 后端服务基本 URL */
    readonly VITE_SERVICE_BASE_URL: string
    /**
     * 后端服务请求成功状态码
     *
     * 收到状态码后，请求即成功
     */
    readonly VITE_SERVICE_SUCCESS_CODE: string
    /**
     * 后端服务的登出状态码
     *
     * 当收到状态码后，用户将被登出并重定向到登录页面
     *
     * 使用 "," 分隔多个状态码
     */
    readonly VITE_SERVICE_LOGOUT_CODES: string
    /**
     * 后端服务的模态注销状态码
     *
     * 收到状态码后，系统将弹出一个模态框，用户将被登出
     *
     * 使用 "," 分隔多个状态码
     */
    readonly VITE_SERVICE_MODAL_LOGOUT_CODES: string
    /**
     * 后端服务的令牌过期状态码
     *
     * 收到状态码后，它会刷新令牌并重新发送请求
     *
     * 使用 "," 分隔多个状态码
     */
    readonly VITE_SERVICE_EXPIRED_TOKEN_CODES: string
    /** 当路由模式为静态时，定义的超级角色 */
    readonly VITE_STATIC_SUPER_ROLE: string
    /**
     * 其它后端服务基本 URL
     *
     * 该值是一个 JSON 对象
     */
    readonly VITE_OTHER_SERVICE_BASE_URL: string
    /**
     * 是否启用 HTTP 代理
     *
     * 仅在开发环境中有效
     */
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo
    /**
     * 身份验证路由模式
     * - static：身份验证路由在前端生成
     * - dynamic：身份验证路由在后端生成
     */
    readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic'
    /**
     * 如果未设置菜单图标，则使用默认菜单图标
     *
     * Iconify 图标名称
     */
    readonly VITE_MENU_ICON: string
    /** 是否使用 sourcemap 构建 */
    readonly VITE_SOURCE_MAP?: CommonType.YesOrNo
    /**
     * Iconify API 提供商网址
     *
     * 如果项目部署在内网，可以将 API 提供程序 URL 设置为本地 Iconify 服务器
     *
     * @link https://iconify.design/docs/api/providers.html
     */
    readonly VITE_ICONIFY_URL?: string
    /**
     * 存储前缀
     *
     * 用于区分不同域的存储
     */
    readonly VITE_STORAGE_PREFIX?: string
    /** 配置应用程序打包后是否自动检测更新 */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE?: CommonType.YesOrNo
    /** 在终端中显示代理 URL 日志 */
    readonly VITE_PROXY_LOG?: CommonType.YesOrNo
    /**
     * Vue DevTools 打开组件源码时使用的编辑器
     * 例如: code / webstorm
     */
    readonly VITE_DEVTOOLS_LAUNCH_EDITOR?: import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions['launchEditor']
  }
}
