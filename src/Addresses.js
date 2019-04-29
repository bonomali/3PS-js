const axios = require('axios')


/**
 * Addresses
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Addresses = function (apiKey, opts = {}) {
    Object.assign(this, {
        hostname: 'https://api.ideea.co.uk/api/v1',
        accessToken: false,
        apiKey: apiKey
    }, opts)
}


// -----------------------------------------------------
// Misc
// -----------------------------------------------------

/**
 * .getHeaders()
 *
 * @returns {Array}
 */
Addresses.prototype.getHeaders = function () {
    var headers = {}
    if (this.apiToken) headers['X-Api-Token'] = this.apiToken
    if (this.accessToken) headers['Authorization'] = 'Bearer ' + this.accessToken
    return headers
}

// -----------------------------------------------------
// ADDRESSES
// -----------------------------------------------------

/**
 * POST /address/create
 * @param {Object} address
 *   @param {String} [address.group_id]
 *   @param {String} [address.name]
 *   @param {String} [address.house_number]
 *   @param {String} [address.address_line_1]
 *   @param {String} [address.address_line_2]
 *   @param {String} [address.zipcode]
 *   @param {String} [address.city]
 *   @param {String} [address.country]
 *   @param {String} [address.delivery_instructions]
 * @returns {Promise}
 */
Addresses.prototype.create = function (address) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/address/create`, address, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * GET /address/:addressID
 *
 * @param {String} addressID
 * @returns {Promise}
 */
Addresses.prototype.get = function (addressID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/address/${addressID}`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * POST /address/:addressID
 * 
 * @param {String} addressID
 * @param {Object} address
 *   @param {String} [address.name]
 *   @param {String} [address.address_line_1]
 *   @param {String} [address.address_line_2]
 *   @param {String} [address.zipcode]
 *   @param {String} [address.city]
 *   @param {String} [address.country]
 *   @param {String} [address.delivery_instructions]
 * @returns {Promise}
 */
Addresses.prototype.update = function (addressID, address) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/address/${addressID}`, address, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * POST /address/:addressID/default
 *
 * @param {String} addressID
 * @returns {Promise}
 */
Addresses.prototype.setDefault = function (addressID) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/address/${addressID}/default`, {}, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * GET /groups/:groupID/addresses
 *
 * @param {String} groupID
 * @returns {Promise}
 */
Addresses.prototype.getByGroupID = function (groupID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/groups/${groupID}/addresses`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * DEL /address/:addressID/delete
 *
 * @param {String} addressID
 * @returns {Promise}
 */
Addresses.prototype.delete = function (addressID) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/address/${addressID}/delete`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


module.exports = Addresses
