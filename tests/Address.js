var { assert } = require("chai");
const tps = require("./tps");

const ADDRESS_ID = "00000000-0000-0000-0000-000000000000";
const GROUP_ID = "2f8fdea3-b875-4926-90c8-5a1b11b818c8";


describe("Addresses", () => {
    describe("TPS.address.create()", () => {
        it("Should return created address object", done => {

            let address = {
                group_id: GROUP_ID,
                name: "Joe Shmoe",
                address_line_1: "18000 Pepe Court",
                // address_line_2: '',
                zipcode: '78462',
                city: 'Dallas',
                state: 'tx',
                country: 'usa',
                delivery_instructions:  'Nope',
            }

            tps.address
                .create(address)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');

                    assert.equal(response.data.group_id,               GROUP_ID);
                    assert.equal(response.data.name,                   address.name);
                    assert.equal(response.data.address_line_1,         address.address_line_1);
                    // assert.equal(response.data.address_line_2,         address.address_line_2);
                    assert.equal(response.data.zipcode,                address.zipcode);
                    assert.equal(response.data.city,                   address.city);
                    assert.equal(response.data.country,                address.country);
                    assert.equal(response.data.state,                  address.state);
                    assert.equal(response.data.delivery_instructions,  address.delivery_instructions);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.address.get()", () => {
        it("Should return specified component", done => {
            tps.address
                .get(ADDRESS_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');

                    assert.containsAllKeys(response.data, [
                        'group_id',
                        'name',
                        'address_line_1',
                        'address_line_2',
                        'zipcode',
                        'city',
                        'country',
                        'state',
                        'delivery_instructions',
                    ]);

                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.address.update()", () => {
        it("Should update the address", done => {
            
            let update = {
                name: "Joe Shmoe",
                address_line_1: "18050 Hokler Road",
                address_line_2: "foo",
                city: "Las Vegas",
                country: "United States",
                zipcode: "38541",
                is_default: false,
                delivery_instructions: "Bruh Idk man"
            }

            tps.address
                .update(ADDRESS_ID, update)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');

                    assert.equal(response.data.name,                   update.name);
                    assert.equal(response.data.address_line_1,         update.address_line_1);
                    assert.equal(response.data.address_line_2,         update.address_line_2);
                    assert.equal(response.data.zipcode,                update.zipcode);
                    assert.equal(response.data.city,                   update.city);
                    assert.equal(response.data.country,                update.country);
                    assert.equal(response.data.delivery_instructions,  update.delivery_instructions);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.address.getByGroupID()", () => {
        it("Should set the default address", done => {
            tps.address
                .getByGroupID(GROUP_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');

                    assert.isArray(response.data);
                    assert.containsAllKeys(response.data[0], [
                        'group_id',
                        'name',
                        'address_line_1',
                        'address_line_2',
                        'zipcode',
                        'city',
                        'country',
                        'state',
                        'delivery_instructions',
                    ]);

                    done();
                })
                .catch(err => done(err));
        });
    });
    
    describe("TPS.address.setDefault()", () => {
        it("Should set the default address", done => {
            tps.address
                .setDefault(ADDRESS_ID)
                .then(response => {
                    assert.isObject(response);
                    assert.equal(response.status, 'ok');

                    assert.equal(response.data.id, ADDRESS_ID);
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe("TPS.address.delete()", () => {
        it("Should delete the address", done => {

            tps.address
                .create({
                    group_id: GROUP_ID,
                    name: "Joe Shmoe",
                    address_line_1: "18000 Pepe Court",
                    // address_line_2: '',
                    zipcode: '78462',
                    city: 'Dallas',
                    state: 'tx',
                    country: 'usa',
                    delivery_instructions:  'Nope',
                })
                .then(response => {

                    // Test
                    tps.address
                        .delete(response.data.id)
                        .then(response => {
                            assert.isObject(response);
                            assert.equal(response.status, 'ok');

                            assert.equal(response.data.id, response.data.id);
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
            
        }).timeout(5000);
    });
});
