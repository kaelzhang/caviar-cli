const path = require('path')
const log = require('util').debuglog('caviar:start')
const Command = require('common-bin')

const {
  Sandbox,
  utils: {monitor}
} = require('caviar')

module.exports = class StartCommand extends Command {
  constructor (raw) {
    super(raw)

    this.options = {
      port: {
        type: 'number',
        description: 'server port',
        default: 7001
      },

      dev: {
        type: 'boolean',
        description: 'whether start the server in development mode',
        default: false
      },

      cwd: {
        type: 'string',
        description: 'set the current working directory',
        default: process.cwd()
      }
    }
  }

  async run ({
    argv
  }) {
    const {
      port,
      dev,
      cwd
    } = argv

    const subprocess = await new Sandbox({
      port,
      dev,
      cwd
    })
    .start()

    monitor(subprocess).catch(console.error)
  }
}
