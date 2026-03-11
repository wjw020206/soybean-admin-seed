import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

/** 获取构建所用时间 */
export function getBuildTime() {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const buildTime = dayjs
    .tz(Date.now(), 'Asia/Shanghai')
    .format('YYYY-MM-DD HH:mm:ss')

  return buildTime
}
