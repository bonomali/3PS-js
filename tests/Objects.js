var { assert } = require("chai");
const fs = require("fs");
const tps = require("./tps");

const GROUP_ID = "2f8fdea3-b875-4926-90c8-5a1b11b818c8";
const OBJECT_ID = "6c85b4fd-c689-4dd8-a6ba-f3280417b011";

describe("Objects", () => {
    describe("TPS.object.latest()", () => {
        it("Should return latest objects", done => {
            tps.object
                .latest()
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isArray(response.data);
                    assert.containsAllKeys(response.data[0], [
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

    describe("TPS.object.search()", () => {
        it("Should return search results", done => {
            tps.object
                .search("foo")
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isArray(response.data);
                    assert.containsAllKeys(response.data[0], [
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

    describe("TPS.object.create()", () => {
        it("Should create object", done => {
            let object = {
                group_id: GROUP_ID,
                name: "Test Object",
                is_public: false,
                image: fs.readFileSync("./tests/thumbnail.jpg"),
                components: [
                    {
                        id: "f16f83ca-31f1-49d0-add5-016cb251f3a5"
                    },
                    {
                        id: "84a4ce43-f145-45a6-8260-b96fc109fd85"
                    }
                ]
            };

            tps.object
                .create(object)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isObject(response.data);
                    assert.equal(response.data.group_id, GROUP_ID);
                    assert.equal(response.data.name, object.name);
                    assert.equal(response.data.is_public, object.is_public);

                    assert.containsAllKeys(response.data, [
                        "id",
                        "group_id",
                        "is_public",
                        "name",
                        "image",
                        "description",
                        "star_count",
                        "components"
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.object.getByGroupID()", () => {
        it("Should return group objects", done => {
            tps.object
                .getByGroupID(GROUP_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.isArray(response.data);
                    assert.containsAllKeys(response.data[0], [
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

    describe("TPS.object.get()", () => {
        it("Should return the object", done => {
            tps.object
                .get(OBJECT_ID)
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

    describe("TPS.object.update()", () => {
        it("Should update the object", done => {
            let update = {
                name: "NEW NAME",
                description: "NEW DESCRIPTION"
            };

            tps.object
                .update(OBJECT_ID, update)
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

    describe("TPS.object.delete()", () => {
        it("Should delete the object", done => {
            tps.object
                .create({
                    group_id: GROUP_ID,
                    name: "Test Object",
                    is_public: false,
                    image: fs.readFileSync("./tests/config/thumbnail.jpg"),
                    components: [
                        {
                            id: "f16f83ca-31f1-49d0-add5-016cb251f3a5"
                        },
                        {
                            id: "84a4ce43-f145-45a6-8260-b96fc109fd85"
                        }
                    ]
                })
                .then(createObjectResponse => {
                    assert.isObject(createObjectResponse);
                    assert.equal(createObjectResponse.status, "ok");

                    // Test
                    tps.object
                        .delete(createObjectResponse.data.id)
                        .then(response => {
                            assert.isObject(response);
                            assert.equal(response.status, "ok");

                            assert.equal(response.data.id, createObjectResponse.data.id);
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        }).timeout(5000);
    });

    describe("TPS.object.star()", () => {
        it("Should star object", done => {
            tps.object
                .star(OBJECT_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.object_id, OBJECT_ID);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.object.unStar()", () => {
        it("Should un-star object", done => {
            tps.object
                .unStar(OBJECT_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.object_id, OBJECT_ID);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.object.addTag()", () => {
        it("Should add tag the object", done => {
            tps.object
                .addTag(OBJECT_ID, "foo")
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.equal(response.data.object_id, OBJECT_ID);
                    assert.equal(response.data.tag, "foo");
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.object.removeTag()", () => {
        it("Should remove tag from the object", done => {
            tps.object
                .addTag(OBJECT_ID, "foo")
                .then(addTagResponse => {
                    assert.isObject(addTagResponse);
                    assert.equal(addTagResponse.status, "ok");

                    // Test
                    tps.object
                        .removeTag(OBJECT_ID, addTagResponse.data.id)
                        .then(response => {
                            assert.isObject(response);
                            assert.equal(response.status, "ok");

                            assert.equal(
                                response.data.id,
                                addTagResponse.data.id
                            );
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });
});
