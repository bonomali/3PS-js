const axios = require("axios");

/**
 * Component
 *
 */
var Component = function () { };


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
 * GET /components/starred
 *
 * @param {Object} opts
 *   @param {String} [opts.page]
 * @returns {Promise}
 */
Component.prototype.starred = function (opts = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.hostname}/components/starred`, {
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
 * @param {FormData} component
 *   @param {String} [component.name]
 *   @param {String} [component.group_id]
 *   @param {String} [component.is_public]
 *   @param {String} [component.layer_height]
 *   @param {String} [component.material]
 *   @param {String} [component.machine]
 *   @param {String} [component.infill]
 *   @param {String} [component.scale]
 *   @param {String} [component.source]
 *   @param {File}   [component.stl]
 * @returns {Promise}
 */
Component.prototype.create = function (component) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/components/create`, component, {
                headers: this.getHeaders()
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
 *   @param {String} [component.name]
 *   @param {String} [component.is_public]
 *   @param {String} [component.layer_height]
 *   @param {String} [component.material]
 *   @param {String} [component.machine]
 *   @param {String} [component.infill]
 *   @param {String} [component.scale]
 *   @param {String} [component.source]
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
 * @param {String} stlID
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
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.hostname}/components/${componentID}/stl/`, formData, {
                headers: this.getHeaders(),
            })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * DEL /components/{component_id}/stl/{stl_id}/delete
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
 * POST estimatorHostname /estimator/components/{component_id}/stl/{stl_id}
 *
 * @param {String} componentID
 * @param {String} stlID
 * @param {Object} estimate
 *  @param {String} [estimate.machine]
 *  @param {String} [estimate.material]
 *  @param {String} [estimate.layer_height]
 *  @param {String} [estimate.infill]
 *  @param {String} [estimate.scale]
 * @returns {Promise}
 */
Component.prototype.estimateSTL = function (componentID, stlID, estimate) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${this.estimatorHostname}/estimator/components/${componentID}/stl/${stlID}`, estimate, {
                headers: this.getHeaders(),
            })
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
 * DEL /components/:component_id/remove-tag/:tag_id 
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


/**
 * GET /components/:component_id/files
 *
 * @param {String} componentID
 * @returns {Promise}
 */
Component.prototype.getFiles = function (componentID) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${
                this.hostname
                }/components/${componentID}/files`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * GET /components/:component_id/files/:file_id/download
 *
 * @param {String} componentID
 * @param {String} fileID
 * @returns {Promise}
 */
Component.prototype.downloadFile = function (componentID, fileID) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${
                this.hostname
                }/components/${componentID}/files/${fileID}/download`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * POST /components/:component_id/files
 *
 * @param {String} componentID
 * @param {FormData} formData
 * @returns {Promise}
 */
Component.prototype.newFile = function (componentID, formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${
                this.hostname
                }/components/${componentID}/files`, formData,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


/**
 * DEL /components/:component_id/files/:file_id 
 *
 * @param {String} componentID
 * @param {String} fileID
 * @returns {Promise}
 */
Component.prototype.deleteFile = function (componentID, fileID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(
                `${
                this.hostname
                }/components/${componentID}/files/${fileID}/delete`,
                {
                    headers: this.getHeaders()
                }
            )
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
};


module.exports = Component;
