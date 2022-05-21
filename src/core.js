const { createHash } = require('crypto')

/**
 * @param {import('koishi').Context} ctx
 * @param {import('../index').Config} config
 */
module.exports = (ctx, config) => {
  const log = ctx.logger('jrrp')

  /** @type {number[]} */
  let levels = []

  /** @type {number[]} */
  let jackpots = []

  /** @type {Record<string, string>} */
  let levelComments = {}

  /** @type {Record<string, string>} */
  let jackpotComments = {}

  const hasCustumLevels = Object.keys(config.levels).length
  const hasCustomJackpots = Object.keys(config.jackpots).length

  if (config.useLevel) {
    if (hasCustumLevels) {
      levelComments = { ...config.levels }
      levels = Object.keys(config.levels).map(n => parseInt(n))
    } else {
      levels = [0, 20, 40, 60, 80]
    }

    levels = levels.sort()
  }

  log.debug('Level comments prepared:\n', levelComments)
  log.debug(`Levels prepared: ${levels}`)

  if (config.useJackpot) {
    if (hasCustomJackpots) {
      jackpotComments = { ...config.jackpots }
      jackpots = Object.keys(config.jackpots).map(n => parseInt(n))
    } else {
      jackpots = [0, 42, 77, 100]
    }
  }

  log.debug('Jackpots comments prepared:\n', jackpotComments)
  log.debug(`Levels prepared: ${levels}`)

  ctx.command('jrrp')
    .userFields(['name'])
    .action(({ session }) => {
      /** @type {string} */
      let name
      if (ctx.database) name = session.user.name
      if (!name) name = session.author.nickname
      if (!name) name = session.author.username

      const luck = createHash('sha256')
      luck.update(session.userId)
      luck.update((new Date().getTime() / (1000 * 60 * 60 * 24)).toFixed(0))
      luck.update('42')

      const luckValue = parseInt(luck.digest('hex'), 16) % 101
      log.debug('Luck value:', luckValue)

      const renderResult = comment => {
        if (config.result) {
          return ctx.i18n.render(config.result, [name, luckValue, comment])
        } else {
          return session.text('jrrp.result', [name, luckValue, comment])
        }
      }

      let comment = ''

      if (config.useJackpot) {
        const jackpotIndex = jackpots.indexOf(luckValue)
        log.debug('Jackpot index:', jackpotIndex)

        if (jackpotIndex != -1) {
          if (hasCustomJackpots) {
            comment = jackpotComments[luckValue]
          } else {
            comment = session.text(`jrrp.default-jackpot-${luckValue}`)
          }
        }
      }

      if (!comment) {
        /** @type {number} */
        let key

        const keyIndex = levels.findIndex(level => luckValue <= level)
        log.debug('Level index:', keyIndex)

        if (keyIndex == -1) key = levels[levels.length - 1]
        else key = levels[keyIndex - 1]
        log.debug('Level key:', key)

        if (hasCustumLevels) {
          comment = levelComments[key]
        } else {
          comment = session.text(`jrrp.default-level-${key}`)
        }
      }

      return renderResult(comment)
    })
}