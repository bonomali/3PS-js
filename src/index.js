const axios = require("axios");

const Address = require("./Address");
const Component = require("./Component");
const Obj = require("./Object");
const Job = require("./Job");

/**
 * TPS
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var TPS = function(apiKey, opts = {}) {
    Object.assign(
        this,
        {
            hostname: "https://3ps.ideea.io/api/v1",
            accessToken: false,
            apiKey: apiKey
        },
        opts
    );


    var base = {
        hostname: this.hostname,
        accessToken: this.accessToken,
        apiKey: this.apiKey,
    }

    this.address = Object.assign(new Address, base);
    this.component = Object.assign(new Component, base);
    this.object = Object.assign(new Obj, base);
    this.job = Object.assign(new Job, base);
};

/**
 * .getHeaders()
 *
 * @returns {Array}
 */
TPS.prototype.getHeaders = function() {
    var headers = {};
    if (this.apiToken) headers["X-Api-Token"] = this.apiToken;
    if (this.accessToken)
        headers["Authorization"] = "Bearer " + this.accessToken;
    return headers;
};

/**
 * Alias of TPS.jobs.create()
 *
 * @param {Object} job
 * @returns {Promise}
 */
TPS.prototype.print = function(job) {
    return this.jobs.create(job);
};

/**
 * GET /search/{query}
 *
 * @param {String} searchQuery
 * @returns {Promise}
 */
TPS.prototype.search = function(query) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/search/${query}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

module.exports = TPS;
