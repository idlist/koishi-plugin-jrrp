import { Context } from 'koishi'

export interface Config {
  /**
   * 是否使用数据库。数据库仅用来获取储存在其中的昵称。
   *
   * 当没有数据库时，此项将被强制设为 `false`。
   *
   * @default true
   */
  useDatabase?: boolean
  /**
   * 自定义结果语句。详情请查看 https://github.com/idlist/koishi-plugin-jrrp 。
   *
   * @default undefined
   */
  result?: string
  /**
   * 是否对人品值进行附加评价。
   *
   * @default true
   */
  useLevel?: boolean
  /**
   * 自定义评价语句。详情请查看 https://github.com/idlist/koishi-plugin-jrrp 。
   *
   * @default {}
   */
  levels?: Record<number | string, string>
  /**
   * 是否对特定分值进行特殊评价。
   *
   * @default true
   */
  useJackpot: boolean
  /**
   * 自定义对特定分值的评价语句。详情请查看 https://github.com/idlist/koishi-plugin-jrrp 。
   *
   * @default {}
   */
  jackpots?: Record<number | string, string>
}

export declare const apply: (ctx: Context, config: Config) => void