var { assert } = require("chai");
const tps = require("./config/tps");

const JOB_ID = "20cc55a3-5d26-43b1-9690-25f5747957c2";
const CANCEL_JOB_ID = "11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const GROUP_ID = "2f8fdea3-b875-4926-90c8-5a1b11b818c8";

describe("Jobs", () => {
    describe("TPS.job.create()", () => {
        it("Should create a single job", done => {
            tps.job
                .create({
                    group_id: GROUP_ID,
                    address_type: "default",
                    components: [
                        {
                            id: "f16f83ca-31f1-49d0-add5-016cb251f3a5"
                        }
                    ]
                })
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");
                    assert.containsAllKeys(response.data, [
                        "is_chargeable",
                        "id",
                        "group_id",
                        "status",
                        "status_note",
                        "fulfillment_type",
                        "address_line_1",
                        "address_line_2",
                        "zipcode",
                        "city",
                        "state",
                        "country",
                        "delivery_instructions",
                        "tracking_code",
                        "printer_id",
                        "printer_group_id",
                        "charge",
                        "charge_id",
                        "components"
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.job.getByGroupID()", () => {
        it("Should return an array of jobs in a group", done => {
            tps.job
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

    describe("TPS.job.get()", () => {
        it("Should return a single job", done => {
            tps.job
                .get(JOB_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.containsAllKeys(response.data, [
                        "is_chargeable",
                        "id",
                        "group_id",
                        "status",
                        "status_note",
                        "fulfillment_type",
                        "address_line_1",
                        "address_line_2",
                        "zipcode",
                        "city",
                        "state",
                        "country",
                        "delivery_instructions",
                        "updated_at",
                        "created_at",
                        "tracking_code",
                        "printer_id",
                        "printer_group_id",
                        "charge",
                        "charge_id",
                        "deleted_at"
                    ]);
                    done();
                })
                .catch(err => done(err.response));
        });
    });

    describe("TPS.job.cancel()", () => {
        it("Should cancel the job", done => {
            tps.job
                .create({
                    group_id: GROUP_ID,
                    address_type: "default",
                    components: [
                        {
                            id: "f16f83ca-31f1-49d0-add5-016cb251f3a5"
                        }
                    ]
                })
                .then(createJob => {
                    assert.isObject(createJob);
                    assert.equal(createJob.status, "ok");

                    // Test
                    tps.job
                        .cancel(createJob.data.id)
                        .then(response => {
                            assert.isObject(response);
                            assert.equal(response.status, "ok");
                            assert.equal(response.data.id, createJob.data.id);
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });

    // -----------------------------------------------------
    // Events
    // -----------------------------------------------------

    describe("TPS.job.getEvents()", () => {
        it("Should return an array of jobs in a group", done => {
            tps.job
                .getEvents(JOB_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");
                    assert.isArray(response.data);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.job.createJobEvent()", () => {
        it("Should return an array of events in a job", done => {
            tps.job
                .createJobEvent(JOB_ID, {
                    title: "TEST",
                    body: "TEST"
                })
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, "ok");

                    assert.containsAllKeys(response.data, [
                        "job_id",
                        "user_id",
                        "type",
                        "title",
                        "author",
                        "body"
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });
});
