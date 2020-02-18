const axios = require("axios");

const Addresses = require("./Addresses");
const Components = require("./Components");
const Objects = require("./Objects");
const Jobs = require("./Jobs");
const Fasteners = require("./Fasteners");


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
            estimatorHostname: "https://3ps-estimator.ideea.io/api/v1",
            accessToken: false,
            apiKey: apiKey
        },
        opts
    );


    var base = {
        hostname: this.hostname,
        estimatorHostname: this.estimatorHostname,
        accessToken: this.accessToken,
        apiKey: this.apiKey,
        getHeaders: function () {
            var headers = {};
            if (this.apiKey) headers["X-Api-Token"] = this.apiKey;
            if (this.accessToken)
                headers["Authorization"] = "Bearer " + this.accessToken;
            return headers;
        }
    }

    this.addresses = Object.assign(new Addresses, base);
    this.components = Object.assign(new Components, base);
    this.objects = Object.assign(new Objects, base);
    this.jobs = Object.assign(new Jobs, base);
    this.fasteners = Object.assign(new Fasteners, base);
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


/**
 * print()
 *
 * @param {FormData} print
 *   @param {File}   [print.stl]
 *   @param {String} [print.group_id]
 *   @param {String} [print.name] 
 *   @param {String} [print.is_public]
 *   @param {String} [print.layer_height]
 *   @param {String} [print.material]
 *   @param {String} [print.machine]
 *   @param {String} [print.infill]
 *   @param {String} [print.scale]
 *   @param {String} [print.source]
 *     
 *   @param {String} [print.delivery]
 *   @param {String} [print.address_type]
 *   @param {Object} [print.address]
 *     @param {String} [print.address.address_line_1]
 *     @param {String} [print.address.address_line_2]
 *     @param {String} [print.address.zipcode]
 *     @param {String} [print.address.city]
 *     @param {String} [print.address.state]
 *     @param {String} [print.address.country]
 *     @param {String} [print.address.delivery_instructions]
 * 
 * @returns {Promise}
 */
TPS.prototype.print = function (print) {
    return new Promise((resolve, reject) => {
        this.components.create(Object.assign({
            is_public: false,
            layer_height: 100,
            material: 'pla-black',
            machine: 'generic-fdm',
            infill: 20,
            scale: 1,
        }, print))
            .then(({ id }) => this.jobs.create(Object.assign({
                address_type: 'default',
                delivery: 'cheapest',
            },
                print,
                {
                    objects: [],
                    components: [{ id }],
                })))
            .then((job) => resolve(job))
            .catch(err => reject(err))
    });
};


module.exports = TPS;
