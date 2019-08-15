const axios = require("axios");

const Addresses = require("./Addresses");
const Components = require("./Components");
const Objects = require("./Objects");
const Jobs = require("./Jobs");

/**
 * TPS
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var TPS = function (apiKey, opts = {}) {
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

    this.addresses = Object.assign(new Addresses, base);
    this.components = Object.assign(new Components, base);
    this.objects = Object.assign(new Objects, base);
    this.jobs = Object.assign(new Jobs, base);
};

/**
 * .getHeaders()
 *
 * @returns {Array}
 */
TPS.prototype.getHeaders = function () {
    var headers = {};
    if (this.apiKey) headers["X-Api-Token"] = this.apiKey;
    if (this.accessToken)
        headers["Authorization"] = "Bearer " + this.accessToken;
    return headers;
};

/**
 * GET /search/{query}
 *
 * @param {String} searchQuery
 * @returns {Promise}
 */
TPS.prototype.search = function (query) {
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
