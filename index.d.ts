import { Context } from 'koishi'

export interface ConfigObject {
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
   * 是否启用对结果的评价。
   *
   * @default true
   */
  levels?: boolean
  /**
   * 自定义评价语句。详情请查看 https://github.com/idlist/koishi-plugin-jrrp 。
   *
   * @default undefined
   */
  levelDescriptions?: Record<number | string, string>
}

export const apply: (ctx: Context, config: ConfigObject) => void