const { createHash } = require('crypto')

class Config {
  constructor(config) {
    config = { ...config }
    this.useDatabase = config.useDatabase ?? true
  }
}

module.exports.name = 'jrrp'

module.exports.apply = (ctx, config) => {
  config = new Config(config)

  ctx.on('connect', () => {
    if (!ctx.database) config.useDatabase = false
  })

  ctx.command('jrrp', '今日人品')
    .userFields(['name'])
    .action(({ session }) => {
      let name
      if (config.useDatabase) name = session.user.name
      if (!name) name = session.sender.nickname
      if (!name) name = session.sender.username

      let luck = createHash('sha256')
      luck.update(name)
      luck.update((new Date().getTime() / (1000 * 60 * 60 * 24)).toFixed(0))
      luck.update('42')

      return name + ' 的今日人品是：' + (parseInt(luck.digest('hex'), 16) % 101)
    })
}