/** 应用的全局命名空间 */
declare namespace App {
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
