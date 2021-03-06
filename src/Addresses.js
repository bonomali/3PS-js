const axios = require("axios");

/**
 * Address
 *
 */
var Address = function () { };


/**
 * POST /address/create
 * @param {Object} address
 *   @param {String} [address.group_id]
 *   @param {String} [address.name]
 *   @param {String} [address.address_line_1]
 *   @param {String} [address.address_line_2]
 *   @param {String} [address.zipcode]
 *   @param {String} [address.city]
 *   @param {String} [address.country]
 *   @param {String} [address.delivery_instructions]
 * @returns {Promise}
 */
Address.prototype.create = function (address) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/address/create`, address, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * GET /address/:addressID
 *
 * @param {String} addressID
 * @returns {Promise}
 */
Address.prototype.get = function (addressID) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/address/${addressID}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * GET /address/group/:groupID
 *
 * @param {String} groupID
 * @returns {Promise}
 */
Address.prototype.getByGroupID = function (groupID) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/address/group/${groupID}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


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
Address.prototype.update = function (addressID, address) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/address/${addressID}`, address, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * POST /address/:addressID/default
 *
 * @param {String} addressID
 * @returns {Promise}
 */
Address.prototype.setDefault = function (addressID) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${this.hostname}/address/${addressID}/default`,
                {},
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * DEL /address/:addressID/delete
 *
 * @param {String} addressID
 * @returns {Promise}
 */
Address.prototype.delete = function (addressID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/address/${addressID}/delete`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


module.exports = Address;
