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
  comment?: boolean
  /**
   * 自定义评价语句。详情请查看 https://github.com/idlist/koishi-plugin-jrrp 。
   *
   * @default undefined
   */
  levels?: Record<number | string, string>
  /**
   * 自定义对特殊分值的评价语句。详情请查看 https://github.com/idlist/koishi-plugin-jrrp 。
   *
   * @default undefined
   */
  jackpots?: Record<number | string, string>
}

export declare const apply: (ctx: Context, config: Config) => void