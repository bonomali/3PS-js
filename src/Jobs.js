const axios = require('axios')


/**
 * Jobs
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Jobs = function (apiKey, opts = {}) {
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
Jobs.prototype.getHeaders = function () {
    var headers = {}
    if (this.apiToken) headers['X-Api-Token'] = this.apiToken
    if (this.accessToken) headers['Authorization'] = 'Bearer ' + this.accessToken
    return headers
}

// -----------------------------------------------------
// JOBS
// -----------------------------------------------------

/**
 * POST /jobs/create
 *
 * @param {Object} job
 *   @param {String} [component.user_id]
 * @returns {Promise}
 */
Jobs.prototype.create = function (job) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/jobs/create`, job, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * GET /jobs/:job_id
 *
 * @param {String} jobID
 * @returns {Promise}
 */
Jobs.prototype.get = function (jobID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/jobs/${jobID}`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * GET /groups/:group_id/jobs
 *
 * @param {String} groupID
 * @returns {Promise}
 */
Jobs.prototype.getByGroupID = function (groupID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/groups/${groupID}/jobs`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * POST /jobs/:job_id
 *
 * @param {String} jobID
 * @param {Object} job
 *   @param {String} [job.status]
 * @returns {Promise}
 */
Jobs.prototype.update = function (jobID, job) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/jobs/${jobID}`, job, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


// -----------------------------------------------------
// Events
// -----------------------------------------------------

/**
 * GET /jobs/:job_id/events
 *
 * @param {String} jobID
 * @returns {Promise}
 */
Jobs.prototype.getJobEvents = function (jobID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/jobs/${jobID}/events`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * POST /jobs/:job_id/events/create
 *
 * @param {String} jobID
 * @param {Object} event
 * @returns {Promise}
 */
Jobs.prototype.createJobEvent = function (jobID, event) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/jobs/${jobID}/events/create`, event, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports = Jobs
