import type { ProxyOptions } from 'vite'
import { bgRed, bgYellow, green, lightBlue } from 'kolorist'
import { consola } from 'consola'
import { createServiceConfig } from '../../src/utils/service'

export function createViteProxy(viteEnv: Env.ImportMeta, enable: boolean) {
  /** 是否启用网络代理 */
  const isEnableHttpProxy = enable && viteEnv.VITE_HTTP_PROXY === 'Y'

  if (!isEnableHttpProxy) return undefined

  /** 是否启用网络代理日志 */
  const isEnableProxyLog = viteEnv.VITE_PROXY_LOG === 'Y'

  const { baseURL, proxyPattern, other } = createServiceConfig(viteEnv)

  const proxy: Record<string, ProxyOptions> = createProxyItem(
    { baseURL, proxyPattern },
    isEnableProxyLog,
  )

  other.forEach((item) => {
    Object.assign(proxy, createProxyItem(item, isEnableProxyLog))
  })

  return proxy
}

function createProxyItem(
  item: App.Service.ServiceConfigItem,
  enableLog: boolean,
) {
  const proxy: Record<string, ProxyOptions> = {}

  proxy[item.proxyPattern] = {
    target: item.baseURL,
    changeOrigin: true,
    configure: (_proxy, options) => {
      _proxy.on('proxyReq', (_proxyReq, req) => {
        if (!enableLog) return

        const requestUrl = `${lightBlue('[proxy url]')}: ${bgYellow(` ${req.method} `)} ${green(`${item.proxyPattern}${req.url}`)}`

        const proxyUrl = `${lightBlue('[real request url]')}: ${green(`${options.target}${req.url}`)}`

        consola.log(`${requestUrl}${proxyUrl}`)
      })

      _proxy.on('error', (_err, req) => {
        if (!enableLog) return

        consola.log(
          bgRed(`Error: ${req.method}`),
          green(`${options.target}${req.url}`),
        )
      })
    },
    rewrite: (path) => path.replace(new RegExp(`^${item.proxyPattern}`), ''),
  }

  return proxy
}
