var { assert } = require("chai");
const fs = require("fs");
const tps = require("./config/tps");
var FormData = require('form-data');

const GROUP_ID = "2f8fdea3-b875-4926-90c8-5a1b11b818c8";
const DOWNLOAD_COMPONENT_ID = "f16f83ca-31f1-49d0-add5-016cb251f3a5";
const VERSION_ID = "f16f83ca-31f1-49d0-add5-016cb251f3a5";
const COMPONENT_ID = "00000000-0000-0000-0000-000000000000";


describe("Components", () => {
    describe("TPS.components.latest()", () => {
        it("Should return latest components", done => {
            tps.components
                .latest()
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isArray(response.data);
                    assert.containsAllKeys(response.data[0], [
                        'id',
                        'created_by',
                        'group_id',
                        'is_public',
                        'name',
                        'image',
                        'description',
                        'source',
                        'star_count',
                        'download_count',
                        'resolution',
                        'material',
                        'color',
                        'process',
                        'infill',
                        'stl_version',
                        'stl_id',
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.search()", () => {
        it("Should return search results", done => {
            tps.components
                .search("foo")
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isArray(response.data);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.create()", () => {
        it("Should create new component", done => {
            let component = {
                name: 'Dice',
                is_public: 'false',
                group_id: GROUP_ID,

                stl: fs.createReadStream('./tests/config/dice.stl'),

                material: 'PLA',
                process: 'FDM',
                resolution: '200',
                infill: '20',
                color: 'Red',
            };

            var formData = new FormData();
            Object.keys(component).map(key => formData.append(key, component[key]))

            tps.components
                .create(formData)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isObject(response.data);
                    assert.equal(response.data.group_id, GROUP_ID);
                    assert.equal(response.data.name, component.name);
                    assert.equal(response.data.is_public, component.is_public);

                    assert.containsAllKeys(response.data[0], [
                        'id',
                        'created_by',
                        'group_id',
                        'is_public',
                        'name',
                        'image',
                        'description',
                        'source',
                        'star_count',
                        'download_count',
                        'resolution',
                        'material',
                        'color',
                        'process',
                        'infill',
                        'stl_version',
                        'stl_id',
                    ]);
                    done();
                })
                .catch(err => done(err.response));
        });
    });

    describe("TPS.components.getByGroupID()", () => {
        it("Should return group objects", done => {
            tps.components
                .getByGroupID(GROUP_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isArray(response.data);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.get()", () => {
        it("Should return the component", done => {
            tps.components
                .get(COMPONENT_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.containsAllKeys(response.data, [
                        "id",
                        "group_id",
                        "is_public",
                        "name",
                        "image",
                        "description",
                        "star_count"
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.update()", () => {
        it("Should update the component", done => {
            let update = {
                name: "NEW NAME",
                description: "NEW DESCRIPTION"
            };

            tps.components
                .update(COMPONENT_ID, update)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.name, update.name);
                    assert.equal(response.data.description, update.description);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.downloadSTL()", () => {
        it("Should return download url", done => {

            tps.components
                .downloadSTL(DOWNLOAD_COMPONENT_ID, VERSION_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.containsAllKeys(response.data, [
                        "url",
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });


    // updateSTL
    // deleteVersion


    describe("TPS.components.delete()", () => {
        it("Should delete component", done => {
            let component = {
                name: 'Dice',
                is_public: 'false',
                group_id: GROUP_ID,

                stl: fs.readFileSync('./tests/config/dice.stl'),

                material: 'PLA',
                process: 'FDM',
                resolution: '200',
                infill: '20',
                color: 'Red',
            };

            var formData = new FormData();
            Object.keys(component).map(key => formData.append(key, component[key]))

            tps.components
                .create(formData)
                .then(createResponse => {
                    assert.isObject(createResponse);
                    assert.equal(createResponse.status, "ok");

                    // Test
                    tps.components
                        .delete(createResponse.data.id)
                        .then(response => {
                            assert.isObject(response);
                            assert.equal(response.status, "ok");

                            assert.containsAllKeys(response.data, [
                                "id",
                            ]);

                            done()
                        })
                        .catch(err => done(err));

                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.star()", () => {
        it("Should star component", done => {
            tps.components
                .star(COMPONENT_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.component_id, COMPONENT_ID);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.unStar()", () => {
        it("Should un-star component", done => {
            tps.components
                .unStar(COMPONENT_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.component_id, COMPONENT_ID);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.addTag()", () => {
        it("Should add tag the component", done => {
            tps.components
                .addTag(COMPONENT_ID, "foo")
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.component_id, COMPONENT_ID);
                    assert.equal(response.data.tag, "foo");
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.components.removeTag()", () => {
        it("Should remove tag from the component", done => {
            tps.components
                .addTag(COMPONENT_ID, "foo")
                .then(addTagResponse => {
                    assert.isObject(addTagResponse);
                    assert.equal(addTagResponse.status, "ok");

                    // Test
                    tps.components
                        .removeTag(COMPONENT_ID, addTagResponse.data.id)
                        .then(response => {
                            assert.isObject(response);
                            assert.equal(response.status, "ok");
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });
});
