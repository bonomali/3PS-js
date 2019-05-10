const axios = require('axios')


/**
 * Components
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Components = function (apiKey, opts = {}) {
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
Components.prototype.getHeaders = function (files = null) {
    var headers = {}
    if (files) {
        headers['Content-Type'] = 'multipart/form-data'
    }
    if (this.apiToken) headers['X-Api-Token'] = this.apiToken
    if (this.accessToken) headers['Authorization'] = 'Bearer ' + this.accessToken
    return headers
}


// -----------------------------------------------------
// COMPONENTS
// -----------------------------------------------------

/**
 * /components/create
 *
 * @param {Object} component Options
 *   @param {String} [component.user_id]
 *   @param {String} [component.group_id]
 * @returns {Promise}
 */
Components.prototype.create = function (component) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/components/create`, component, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * GET /components
 *
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Components.prototype.latest = function (opts = {}) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/components`, {
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
 * GET /groups/{groupID}/components
 *
 * @param {String} groupID
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Components.prototype.getByGroupID = function (groupID, opts = {}) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/groups/${groupID}/components`, {
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
 * GET /components/:component_id
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Components.prototype.get = function (componentID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/components/${componentID}`, {
            headers: this.getHeaders('files')

        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}


/**
 * GET /components/:component_id/download
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Components.prototype.download = function (componentID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/components/${componentID}/download`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * POST /components/:component_id
 *
 * @param {String} componentID
 * @param {Object} component
 *   @param {String} [component.user_id]
 *   @param {String} [component.group_id]
 * @returns {Promise}
 */
Components.prototype.update = function (componentID, component) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/components/${componentID}`, component, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * POST /components/:component_id/image
 *
 * @param {String} componentID
 * @param {String} dataURL
 * @returns {Promise}
 */
Components.prototype.updateImage = function (componentID, image) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/components/${componentID}/image`, { image }, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * DEL /components/:component_id/delete
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Components.prototype.delete = function (componentID) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/components/${componentID}/delete`, {
            headers: this.getHeaders()
        })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))
    })
}

/**
 * POST /components/:component_id/star
 *
 * @param {String} componentID
 * @param {String} userId
 * @returns {Promise}
 */
Components.prototype.star = function (componentID) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/components/${componentID}/star`, {}, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * GET /components/all/stars
 * @returns {Promise}
 */
Components.prototype.getStarComponents = function () {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/components/all/stars`, {
            headers: this.getHeaders(),
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * DEL /components/:component_id/un-star
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Components.prototype.unStar = function (componentID) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/components/${componentID}/un-star`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * POST /components/{component_id}/stl
 *
 * @param {String} componentID
 * @param {FormData} formData
 * @returns {Promise}
 */
Components.prototype.updateStl = function (componentID, formData) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/components/${componentID}/stl/`, formData, {
            headers: this.getHeaders('files'),
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * DEL /components/{component_id}/stl/{version}
 *
 * @param {String} componentID
 * @param {String} version
 * @returns {Promise}
 */
Components.prototype.deleteVersion = function (componentID, version = 0) {
    return new Promise((resolve, reject) => {
        axios.delete(`${this.hostname}/components/${componentID}/stl/delete/${version}`, {
            headers: this.getHeaders(),
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * GET /components/{component_id}/stl
 *
 * @param {String} componentID
 * @param {String} version
 * @returns {Promise}
 */
Components.prototype.download = function (componentID, version) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/components/${componentID}/download/${version}`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports = Components
