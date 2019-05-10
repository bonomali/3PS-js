const axios = require('axios')


/**
 * Printer
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Printer = function (apiKey, opts = {}) {
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
Printer.prototype.getHeaders = function () {
    var headers = {}
    if (this.apiToken) headers['X-Api-Token'] = this.apiToken
    if (this.accessToken) headers['Authorization'] = 'Bearer ' + this.accessToken
    return headers
}

// -----------------------------------------------------
// PRINTER
// -----------------------------------------------------

/**
 * GET /printer/jobs/available
 *
 * @returns {Promise}
 */
Printer.prototype.getAvailableJobs = function () {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/printer/jobs/available`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * GET /printer/groups/{group_id}/jobs
 *
 * @param {String} groupID
 * @returns {Promise}
 */
Printer.prototype.getGroupJobs = function (groupID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/printer/groups/${groupID}/jobs`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * GET /printer/jobs/{job_id}
 *
 * @param {String} jobID
 * @returns {Promise}
 */
Printer.prototype.getJob = function (jobID) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.hostname}/printer/jobs/${jobID}`, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * POST /printer/jobs/{job_id}
 *
 * @param {String} jobID
 * @param {Object} job
 *   @param {String} [job.status]
 *   @param {String} [job.tracking_code]
 * @returns {Promise}
 */
Printer.prototype.updateJob = function (jobID, job) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/printer/jobs/${jobID}`, job, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * POST /printer/jobs/{job_id}/claim
 *
 * @param {String} jobID
 * @param {String} printerGroupID
 * @returns {Promise}
 */
Printer.prototype.claimJob = function (jobID, printerGroupID) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/printer/jobs/${jobID}/claim`, {
            printer_group_id: printerGroupID
        }, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * POST /printer/jobs/{job_id}/charge
 *
 * @param {String} jobID
 * @param {String} charge
 * @returns {Promise}
 */
Printer.prototype.chargeJob = function (jobID, charge) {
    return new Promise((resolve, reject) => {
        axios.post(`${this.hostname}/printer/jobs/${jobID}/charge`, charge, {
            headers: this.getHeaders()
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    })
}


module.exports = Printer
