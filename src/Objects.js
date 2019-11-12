const axios = require("axios");

/**
 * Obj
 *
 * @param {String} apiKey
 * @param {Object} opts options
 *   @param {String} [opts.hostname]
 *   @param {String} [opts.accessToken]
 */
var Obj = function (apiKey, opts = {}) {
    Object.assign(
        this,
        {
            hostname: "https://api.ideea.co.uk/api/v1",
            accessToken: false,
            apiKey: apiKey
        },
        opts
    );
};

// -----------------------------------------------------
// Misc
// -----------------------------------------------------

/**
 * .getHeaders()
 *
 * @returns {Array}
 */
Obj.prototype.getHeaders = function () {
    var headers = {};
    if (this.apiKey) headers["X-Api-Token"] = this.apiKey;
    if (this.accessToken)
        headers["Authorization"] = "Bearer " + this.accessToken;
    return headers;
};

// -----------------------------------------------------
// OBJECTS
// -----------------------------------------------------

/**
 * GET /objects
 *
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Obj.prototype.latest = function (opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/objects`, {
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
 * GET /objects/starred
 *
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Obj.prototype.starred = function (opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/objects/starred`, {
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
 * GET /objects/search/{query}
 *
 * @param {String} query
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Obj.prototype.search = function (query, opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/objects/search/${query}`, {
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
 * /objects/create
 *
 * @param {Object} object Options
 *   @param {String} [object.user_id]
 *   @param {String} [object.group_id]
 *   @param {String} [object.is_public]
 *   @param {File} [object.image]
 * @returns {Promise}
 */
Obj.prototype.create = function (object) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/objects/create`, object, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * GET /objects/group/{groupID}
 *
 *
 * @param {String} groupID
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Obj.prototype.getByGroupID = function (groupID, opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/objects/group/${groupID}`, {
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
 * GET /objects/:object_id
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Obj.prototype.get = function (objectID, opts) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/objects/${objectID}`, {
                headers: this.getHeaders(),
                params: {
                    with: opts.with || null
                }
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /objects/:object_id
 *
 * @param {String} objectID
 * @param {Object} object
 *   @param {String} [object.user_id]
 *   @param {String} [object.group_id]
 * @returns {Promise}
 */
Obj.prototype.update = function (objectID, object) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/objects/${objectID}`, object, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /objects/:object_id/add-component
 *
 * @param {String} objectID
 * @param {Object} component
 *   @param {String} [component.id]
 *   @param {String} [component.stl_id]
 *   @param {String} [component.machine]
 *   @param {String} [component.material]
 *   @param {String} [component.layer_height]
 *   @param {String} [component.infill]
 *   @param {String} [component.scale]
 *   @param {String} [component.count]
 * @returns {Promise}
 */
Obj.prototype.addComponent = function (objectID, component) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/objects/${objectID}/add-component`, component, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /objects/:object_id/edit-component/:component_object_id
 *
 * @param {String} objectID
 * @param {String} componentObjectID
 * @param {Object} component
 *   @param {String} [component.stl_id]
 *   @param {String} [component.machine]
 *   @param {String} [component.material]
 *   @param {String} [component.layer_height]
 *   @param {String} [component.infill]
 *   @param {String} [component.scale]
 *   @param {String} [component.count]
 * @returns {Promise}
 */
Obj.prototype.editComponent = function (objectID, componentObjectID, component) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/objects/${objectID}/edit-component/${componentObjectID}`, component, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * DEL /objects/:object_id/delete-component/:component_object_id
 *
 * @param {String} objectID
 * @param {String} componentObjectID
 * @returns {Promise}
 */
Obj.prototype.deleteComponent = function (objectID, componentObjectID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/objects/${objectID}/delete-component/${componentObjectID}`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * DEL /objects/:object_id/delete
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Obj.prototype.delete = function (objectID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/objects/${objectID}/delete`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /objects/:object_id/star
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Obj.prototype.star = function (objectID) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${this.hostname}/objects/${objectID}/star`,
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
 * DEL /objects/:object_id/un-star
 *
 * @param {String} objectID
 * @returns {Promise}
 */
Obj.prototype.unStar = function (objectID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${this.hostname}/objects/${objectID}/un-star`, {
                headers: this.getHeaders()
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

/**
 * POST /objects/:object_id/add-tag
 *
 * @param {String} objectID
 * @param {String} tag
 * @returns {Promise}
 */
Obj.prototype.addTag = function (objectID, tag) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${this.hostname}/objects/${objectID}/add-tag`,
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
 * DELETE /objects/:object_id/remove-tag/:tag_id
 *
 * @param {String} objectID
 * @param {String} tagID
 * @returns {Promise}
 */
Obj.prototype.removeTag = function (objectID, tagID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(
                `${this.hostname}/objects/${objectID}/remove-tag/${tagID}`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};

module.exports = Obj;
