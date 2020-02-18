const axios = require("axios");

/**
 * Fastener
 *
 */
var Fastener = function () { };


/**
 * GET /fasteners
 *
 * @returns {Promise}
 */
Fastener.prototype.all = function () {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/fasteners`, {
                headers: this.getHeaders(),
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

module.exports = Fastener;
