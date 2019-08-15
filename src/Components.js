const axios = require("axios");

/**
 * Component
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Component = function () { };

// -----------------------------------------------------
// Misc
// -----------------------------------------------------

/**
 * .getHeaders()
 *
 * @returns {Array}
 */
Component.prototype.getHeaders = function (extra = {}) {
    var headers = {};
    if (this.apiKey) headers["X-Api-Token"] = this.apiKey;
    if (this.accessToken) headers["Authorization"] = "Bearer " + this.accessToken;
    return Object.assign(extra, headers);
};

// -----------------------------------------------------
// COMPONENTS
// -----------------------------------------------------

/**
 * GET /components
 *
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Component.prototype.latest = function (opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/components`, {
                headers: this.getHeaders(),
                params: {
                    page: opts.page || 1
                }
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /components/search/{query}
 *
 * @param {String} query
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Component.prototype.search = function (query, opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/components/search/${query}`, {
                headers: this.getHeaders(),
                params: {
                    page: opts.page || 1
                }
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * /components/create
 *
 * @param {FormData} component Options
 *   @param {String} [component.user_id]
 *   @param {String} [component.group_id]
 * @returns {Promise}
 */
Component.prototype.create = function (component) {

    var extraHeaders = {}
    if (typeof component.getHeaders === 'function') {
        extraHeaders = component.getHeaders()
    }

    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/components/create`, component, {
                headers: this.getHeaders(extraHeaders)
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /components/group/{groupID}
 *
 * @param {String} groupID
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Component.prototype.getByGroupID = function (groupID, opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/components/group/${groupID}`, {
                headers: this.getHeaders(),
                params: {
                    page: opts.page || 1
                }
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /components/:component_id
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Component.prototype.get = function (componentID) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/components/${componentID}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /components/:component_id
 *
 * @param {String} componentID
 * @param {Object} component
 *   @param {String} [component.user_id]
 *   @param {String} [component.group_id]
 * @returns {Promise}
 */
Component.prototype.update = function (componentID, component) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/components/${componentID}`, component, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /components/:component_id/download/:stl_id
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Component.prototype.downloadSTL = function (componentID, stlID) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${
                this.hostname
                }/components/${componentID}/download/${stlID}`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /components/{component_id}/stl
 *
 * @param {String} componentID
 * @param {FormData} formData
 * @returns {Promise}
 */
Component.prototype.newSTL = function (componentID, formData) {

    var extraHeaders = {}
    if (typeof formData.getHeaders === 'function') {
        extraHeaders = formData.getHeaders()
    }


    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/components/${componentID}/stl/`, formData, {
                headers: this.getHeaders(extraHeaders),
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * DEL /components/{component_id}/stl/{version_id}/delete
 *
 * @param {String} componentID
 * @param {String} stlID
 * @returns {Promise}
 */
Component.prototype.deleteSTL = function (componentID, stlID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/components/${componentID}/stl/${stlID}/delete`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * DEL /components/:component_id/delete
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Component.prototype.delete = function (componentID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/components/${componentID}/delete`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /components/:component_id/star
 *
 * @param {String} componentID
 * @param {String} userId
 * @returns {Promise}
 */
Component.prototype.star = function (componentID) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${this.hostname}/components/${componentID}/star`,
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
 * DEL /components/:component_id/un-star
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Component.prototype.unStar = function (componentID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/components/${componentID}/un-star`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /components/:component_id/add-tag
 *
 * @param {String} componentID
 * @param {String} tag
 * @returns {Promise}
 */
Component.prototype.addTag = function (componentID, tag) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${this.hostname}/components/${componentID}/add-tag`,
                { tag },
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * DEL /components/:component_id/un-star
 *
 * @param {String} componentID
 * @param {String} tagID
 * @returns {Promise}
 */
Component.prototype.removeTag = function (componentID, tagID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(
                `${
                this.hostname
                }/components/${componentID}/remove-tag/${tagID}`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

module.exports = Component;
