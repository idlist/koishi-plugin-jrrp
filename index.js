const { Schema: S } = require('koishi')
const core = require('./src/core.js')

module.exports.name = 'jrrp'

const ToString = S.union([
  S.string(),
  S.transform(S.number(), n => `${n}`),
])

module.exports.schema = S.object({
  useDatabase: S.boolean().default(true)
    .description('是否使用数据库。数据库仅用来获取储存在其中的昵称。当没有数据库时，此项将被强制设为 `false`。'),
  result: S.string()
    .description('自定义结果语句。详情请查看 [README](https://github.com/idlist/koishi-plugin-jrrp)。'),
  useLevel: S.boolean().default(true)
    .description('是否对人品值进行附加评价。'),
  levels: S.dict(ToString, S.string())
    .description('自定义评价语句。详情请查看 [README](https://github.com/idlist/koishi-plugin-jrrp)。'),
  useJackpot: S.boolean().default(true)
    .description('是否对特定分值进行特殊评价。'),
  jackpots: S.dict(ToString, S.string())
    .description('自定义对特殊分值的评价语句。详情请查看 [README](https://github.com/idlist/koishi-plugin-jrrp)。'),
})

/**
 * @param {import('koishi').Context} ctx
 * @param {import('./index').Config} config
 */
module.exports.apply = (ctx, config) => {
  ctx.i18n.define('zh', require('./locales/zh'))
  const log = ctx.logger('jrrp')

  config = {
    useDatabase: true,
    result: undefined,
    useLevel: true,
    levels: {},
    useJackpot: true,
    jackpots: {},
    ...config,
  }

  if (config.useLevel && Object.keys(config.levels).length && !config.levels['0']) {
    log.warn('Level comments is used but comment is not provided at score 0. This may cause unexpected behavior.')
  }

  ctx.plugin(core, config)
}