const Addresses = require('./Addresses')
const Components = require('./Components')
const Objects = require('./Objects')
const Jobs = require('./Jobs')
const Printer = require('./Printer')

/**
 * TPS
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var TPS = function (apiKey, opts = {}) {
    Object.assign(this, {
        hostname: 'https://api.ideea.co.uk/api/v1',
        accessToken: false,
        apiKey: apiKey
    }, opts)

    this.addresses = new Addresses(apiKey, opts)
    this.components = new Components(apiKey, opts)
    this.objects = new Objects(apiKey, opts)
    this.jobs = new Jobs(apiKey, opts)
    this.printer = new Printer(apiKey, opts)
}

module.exports = TPS
