const { createHash } = require('crypto')

/**
 * @param {import('koishi').Context} ctx
 * @param {import('../index').Config} config
 */
module.exports = (ctx, config) => {
  let useDatabase = false

  ctx.on('service', name => {
    if (name == 'database' && config.useDatabase && ctx.database) {
      useDatabase = true
    }
  })

  /** @type {number[]} */
  let levels = []

  /** @type {number[]} */
  let jackpots = []

  /** @type {Record<string, string>} */
  const levelComments = {}

  /** @type {Record<string, string>} */
  const jackpotComments = {}

  const hasCustumLevelComments = Object.keys(config.levels).length
  const hasCustomJackpotComments = Object.keys(config.jackpots).length

  if (config.comment) {
    if (hasCustumLevelComments) {
      for (const level in config.levels) {
        levelComments[level] = config.levels[level]
        levels.push(typeof level == 'number' ? level : parseInt(level))
      }
    } else {
      levels = [0, 20, 40, 60, 80]
    }

    levels = levels.sort()

    if (hasCustomJackpotComments) {
      for (const number in config.jackpots) {
        jackpotComments[number] = config.jackpots[number]
        jackpots.push(typeof number == 'number' ? number : parseInt(number))
      }
    } else {
      jackpots = [0, 42, 77, 100]
    }
  }

  ctx.command('jrrp')
    .userFields(['name'])
    .action(({ session }) => {
      /** @type {string} */
      let name
      if (useDatabase) name = session.user.name
      if (!name) name = session.author.nickname
      if (!name) name = session.author.username

      const luck = createHash('sha256')
      luck.update(session.userId)
      luck.update((new Date().getTime() / (1000 * 60 * 60 * 24)).toFixed(0))
      luck.update('42')

      const luckValue = parseInt(luck.digest('hex'), 16) % 101

      const renderResult = comment => {
        if (config.result) {
          return ctx.i18n.render(config.result, [name, luckValue, comment])
        } else {
          return session.text('jrrp.result', [name, luckValue, comment])
        }
      }

      if (config.comment) {
        /** @type {string} */
        let comment

        const jackpotIndex = jackpots.indexOf(luckValue)

        if (jackpotIndex != -1) {
          if (hasCustomJackpotComments) {
            comment = jackpotComments[luckValue]
          } else {
            comment = session.text(`jrrp.default-jackpot-${luckValue}`)
          }
        } else {
          /** @type {number} */
          let key

          const keyIndex = levels.findIndex(level => luckValue <= level)
          if (keyIndex == -1) key = levels[levels.length - 1]
          else key = levels[keyIndex]

          if (hasCustumLevelComments) {
            comment = levelComments[key]
          } else {
            comment = session.text(`jrrp.default-level-${key}`)
          }
        }

        return renderResult(comment)
      } else {
        return renderResult('')
      }
    })
}