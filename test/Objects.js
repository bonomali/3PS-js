var { assert } = require('chai')
const TPS = require('../src')


const GROUP_ID = '00000000-9a34-4466-ba4c-46438def7d7f'
const USER_ID = '00000000-0000-0000-0000-000000000000'
var objectId = ''

var tps = new TPS('', {
  accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFhYWFhYWFhLTlhMzQtNDQ2Ni1iYTRjLTQ2NDM4ZGVmN2Q3ZiIsImVtYWlsIjoiYW50aG9ueWJ1ZGRAaWRlZWEuY28udWsiLCJmaXJzdF9uYW1lIjoiQW50aG9ueSIsImxhc3RfbmFtZSI6IkJ1ZGQiLCJkaXNwbGF5X25hbWUiOiJBbnRob255IEJ1ZGQiLCJwcm9maWxlX2ltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS92MS91c2VyL3Byb2ZpbGUtaW1hZ2UvYW50aG9ueSUyMGJ1ZGQiLCJ0eXBlIjoiVVNFUiIsImRlbGV0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOm51bGwsInVwZGF0ZWRfYXQiOm51bGwsImdyb3VwcyI6W3siaWQiOiIwMDAwMDAwMC05YTM0LTQ0NjYtYmE0Yy00NjQzOGRlZjdkN2YiLCJyb2xlIjoiYWRtaW4ifV0sImlhdCI6MTU1NDU4MjgzMCwiZXhwIjozMTA5MjUyMDYwfQ.QqctNsAV4pmjij5T2rB0_dOGXjiKzvfbPLOgh-VHwpM',
  hostname: 'http://3ps.ideea.local/api/v1'
})

describe('Objects', () => {

  describe('TPS.createObject()', () => {
    it('Should return created object', done => {
      tps.objects.create(USER_ID, GROUP_ID).then(object => {
        objectId = object.id
        assert.isObject(object)
        done()
      })
        .catch(err => done(err))
    })
  })

  describe('TPS.getObject()', () => {
    it('Should return specified object', done => {
      tps.objects.get(objectId).then(object => {
        assert.isObject(object)
        done()
      })
        .catch(err => done(err))
    })
  })



  describe('TPS.updateObject()', () => {
    it('Should update the component', done => {
      tps.objects.update(objectId, {
        user_id: USER_ID,
        group_id: GROUP_ID
      }).then(item => {
        assert.isObject(item)
        done()
      })
        .catch(err => done(err))
    })
  })

  describe('TPS.deleteObject()', () => {
    it('Should return the delete the object', done => {
      tps.objects.delete(objectId).then(object => {
        assert.isObject(object)
        done()
      })
        .catch(err => done(err))
    })
  })
})
