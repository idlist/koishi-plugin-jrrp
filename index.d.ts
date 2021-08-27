import { Context } from 'koishi'

export interface ConfigObject {
  /**
   * Whether to use the database.
   *
   * Database is only used to read the nickname saved in the database.
   *
   * When there is no database, this item is forced to be `false`.
   *
   * @default true
   */
  useDatabase?: boolean
  /**
   * The custom result message.
   *
   * When not set (`undefined`), the default result template is used.
   *
   * @default undefined
   */
  result?: string
  /**
   * Whether to give a simple comment on the result.
   *
   * @default true
   */
  levels?: boolean
  /**
   * The custom comments used to comment on the result.
   *
   * When not set, (`undefined`), the default judging template is used.
   *
   * @default undefined
   */
  levelDescriptions?: Record<number | string, string>
}

export const apply: (ctx: Context, config: ConfigObject) => void