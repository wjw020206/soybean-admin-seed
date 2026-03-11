import json5 from 'json5'

/**
 * 根据当前环境创建服务配置
 * @param env 当前环境变量对象
 */
export function createServiceConfig(env: Env.ImportMeta) {
  const { VITE_SERVICE_BASE_URL, VITE_OTHER_SERVICE_BASE_URL } = env

  let other = {} as Record<App.Service.OtherBaseURLKey, string>

  try {
    other = json5.parse(VITE_OTHER_SERVICE_BASE_URL)
  } catch {
    console.error('VITE_OTHER_SERVICE_BASE_URL 不是有效的 JSON5 字符串')
  }

  const httpConfig: App.Service.SimpleServiceConfig = {
    baseURL: VITE_SERVICE_BASE_URL,
    other,
  }

  const otherHttpKeys = Object.keys(
    httpConfig.other,
  ) as App.Service.OtherBaseURLKey[]

  const otherConfig: App.Service.OtherServiceConfigItem[] = otherHttpKeys.map(
    (key) => {
      return {
        key,
        baseURL: httpConfig.other[key],
        proxyPattern: createProxyPattern(key),
      }
    },
  )

  const config: App.Service.ServiceConfig = {
    baseURL: httpConfig.baseURL,
    proxyPattern: createProxyPattern(),
    other: otherConfig,
  }

  return config
}

/**
 * 获取代理到该服务的路径匹配规则
 *
 * @param key 如果未设置，则使用 default 作为 key
 */
function createProxyPattern(key?: App.Service.OtherBaseURLKey) {
  if (!key) {
    return '/proxy-default'
  }

  return `/proxy-${key}`
}
