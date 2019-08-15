const axios = require("axios");

/**
 * Job
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Job = function() {};

// -----------------------------------------------------
// Misc
// -----------------------------------------------------

/**
 * .getHeaders()
 *
 * @returns {Array}
 */
Job.prototype.getHeaders = function() {
    var headers = {};
    if (this.apiKey) headers["X-Api-Token"] = this.apiKey;
    if (this.accessToken)
        headers["Authorization"] = "Bearer " + this.accessToken;
    return headers;
};

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
Job.prototype.create = function(job) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/jobs/create`, job, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /jobs/group/:group_id
 *
 * @param {String} groupID
 * @returns {Promise}
 */
Job.prototype.getByGroupID = function(groupID) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/jobs/group/${groupID}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /jobs/:job_id
 *
 * @param {String} jobID
 * @returns {Promise}
 */
Job.prototype.get = function(jobID) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/jobs/${jobID}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * DELETE /jobs/:job_id/cancel
 *
 * @param {String} jobID
 * @returns {Promise}
 */
Job.prototype.cancel = function(jobID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/jobs/${jobID}/cancel`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /jobs/demo-print
 *
 * @param {Object} demoPrint
 *   @param {String} [demoPrint.group_id]
 *   @param {String} [demoPrint.component_id]
 *   @param {String} [demoPrint.color]
 *   @param {String} [demoPrint.address_line_1]
 *   @param {String} [demoPrint.address_line_2]
 *   @param {String} [demoPrint.zipcode]
 *   @param {String} [demoPrint.city]
 *   @param {String} [demoPrint.state]
 *   @param {String} [demoPrint.country]
 *   @param {String} [demoPrint.delivery_instructions]
 * @returns {Promise}
 */
Job.prototype.demoPrint = function(demoPrint) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/jobs/demo-print`, demoPrint, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

// -----------------------------------------------------
// Events
// -----------------------------------------------------

/**
 * GET /jobs/:job_id/events
 *
 * @param {String} jobID
 * @returns {Promise}
 */
Job.prototype.getJobEvents = function(jobID) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/jobs/${jobID}/events`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /jobs/:job_id/events/create
 *
 * @param {String} jobID
 * @param {Object} event
 * @returns {Promise}
 */
Job.prototype.createJobEvent = function(jobID, event) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/jobs/${jobID}/events/create`, event, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

module.exports = Job;
