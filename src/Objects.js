const axios = require('axios')


/**
 * Objects
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Objects = function (apiKey, opts = {}) {
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
Objects.prototype.getHeaders = function () {
    var headers = {}
    if (this.apiToken) headers['X-Api-Token'] = this.apiToken
    if (this.accessToken) headers['Authorization'] = 'Bearer ' + this.accessToken
    return headers
}


// -----------------------------------------------------
// OBJECTS
// -----------------------------------------------------

/**
 * /objects/create
 *
 * @param {Object} object Options
 *   @param {String} [object.user_id]
 *   @param {String} [object.group_id]
 * @returns {Promise}
 */
Objects.prototype.create = function (object) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/objects/create`, object, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * GET /objects
 *
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Objects.prototype.latest = function (opts = {}) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/objects`, {
            headers: this.getHeaders(),
            params: {
                page: opts.page || 1
            },
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * GET /groups/{groupID}/objects
 *
 * @param {String} groupID
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Objects.prototype.getByGroupID = function (groupID, opts = {}) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/groups/${groupID}/objects`, {
            headers: this.getHeaders(),
            params: {
                page: opts.page || 1
            },
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * GET /objects/:object_id
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Objects.prototype.get = function (objectID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/objects/${objectID}`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * POST /objects/:object_id
 *
 * @param {String} objectID
 * @param {Object} object
 *   @param {String} [object.user_id]
 *   @param {String} [object.group_id]
 * @returns {Promise}
 */
Objects.prototype.update = function (objectID, object) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/objects/${objectID}`, object, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * GET /objects/:object_id/tags
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Objects.prototype.getTags = function (objectID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/objects/${objectID}/tags`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * POST /objects/:object_id/add-tag
 *
 * @param {String} objectID
 * @param {String} tag
 * @returns {Promise}
 */
Objects.prototype.addTag = function (objectID, tag) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/objects/${objectID}/add-tag`, { tag }, {
            headers: this.getHeaders(),
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * DELETE /objects/:object_id/remove-tag/:tag_id
 *
 * @param {String} objectID
 * @param {String} tagID
 * @returns {Promise}
 */
Objects.prototype.deleteTag = function (objectID, tagID) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/objects/${objectID}/delete-tag/${tagID}`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * GET /objects/search
 *
 * @param {String} searchQuery
 * @returns {Promise}
 */
Objects.prototype.search = function (searchQuery) {
    console.log('3ps SQ', searchQuery)
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/objects/search/${searchQuery}`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * DEL /objects/:object_id/delete
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Objects.prototype.delete = function (objectID) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/objects/${objectID}/delete`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * POST /objects/:object_id/star
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Objects.prototype.star = function (objectID) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/objects/${objectID}/star`, {}, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * DEL /objects/:object_id/un-star
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Objects.prototype.unStar = function (objectID) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/objects/${objectID}/un-star`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports = Objects
