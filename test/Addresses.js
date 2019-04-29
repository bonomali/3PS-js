var { assert } = require('chai')
const TPS = require('../src')

const ADDRESS_ID = '00000000-0000-0000-0000-000000000000'
const GROUP_ID = '00000000-9a34-4466-ba4c-46438def7d7f'

var tps = new TPS('', {
  accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFhYWFhYWFhLTlhMzQtNDQ2Ni1iYTRjLTQ2NDM4ZGVmN2Q3ZiIsImVtYWlsIjoiYW50aG9ueWJ1ZGRAaWRlZWEuY28udWsiLCJmaXJzdF9uYW1lIjoiQW50aG9ueSIsImxhc3RfbmFtZSI6IkJ1ZGQiLCJkaXNwbGF5X25hbWUiOiJBbnRob255IEJ1ZGQiLCJwcm9maWxlX2ltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS92MS91c2VyL3Byb2ZpbGUtaW1hZ2UvYW50aG9ueSUyMGJ1ZGQiLCJ0eXBlIjoiVVNFUiIsImRlbGV0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOm51bGwsInVwZGF0ZWRfYXQiOm51bGwsImdyb3VwcyI6W3siaWQiOiIwMDAwMDAwMC05YTM0LTQ0NjYtYmE0Yy00NjQzOGRlZjdkN2YiLCJyb2xlIjoiYWRtaW4ifV0sImlhdCI6MTU1NDU4MjgzMCwiZXhwIjozMTA5MjUyMDYwfQ.QqctNsAV4pmjij5T2rB0_dOGXjiKzvfbPLOgh-VHwpM',
  hostname: 'http://3ps.ideea.local/api/v1'
})

describe('Addresses', () => {

  describe('TPS.createAddress()', () => {
    it('Should return created address object', done => {
      tps.addresses.create({
      group_id: GROUP_ID,
      id: ADDRESS_ID,
      name: 'Joe Shmoe',
      address_line_1: '18000 Pepe Court',
      city: 'Las Vegas',
      zipcode: '38541',
      is_default: false,
      delivery_instructions: 'Just be cool'
    }).then(address => {
        assert.isObject(address)
        done()
      })
        .catch(err => done(err))
    })
  })

  describe('TPS.getAddress()', () => {
    it('Should return specified component', done => {
      tps.addresses.get(ADDRESS_ID).then(address => {
        assert.isObject(address)
        done()
      })
        .catch(err => done(err))
    })
  })



  describe('TPS.updateAddress()', () => {
    it('Should update the address', done => {
      tps.addresses.update(ADDRESS_ID, {
        name: 'Joe Shmoe',
        address_line_1: '18050 Pepe Court',
        address_line_2: '',
        city: 'Las Vegas',
        country: 'United States',
        zipcode: '38541',
        is_default: false,
        delivery_instructions: 'Bruh Idk man'
      }).then(address => {
        assert.isObject(address)
        done()
      })
        .catch(err => done(err))
    })
  })

  describe('TPS.getByGroup()', () => {
    it('Should set the default address', done => {
      tps.addresses.getByGroupID(GROUP_ID).then(addresses => {
        assert.isObject(addresses)
        done()
      })
        .catch(err => done(err))
    })
  })
  describe('TPS.setDefault()', () => {
    it('Should set the default address', done => {
      tps.addresses.setDefault(ADDRESS_ID).then(address => {
        assert.isObject(address)
        done()
      })
        .catch(err => done(err))
    })
  })

  describe('TPS.deleteAddress()', () => {
    it('Should update the current user', done => {
      tps.addresses.delete(ADDRESS_ID).then(address => {
        assert.isObject(address)
        done()
      })
        .catch(err => done(err))
    })
  })
})
