const core = require('./src/core.js')

module.exports.name = 'jrrp'

/**
 * @param {import('koishi').Context} ctx
 * @param {import('./index').Config} config
 */
module.exports.apply = (ctx, config) => {
  ctx.plugin(core, config)
}