var { assert } = require('chai')
const TPS = require('../src')

const GROUP_ID = '00000000-9a34-4466-ba4c-46438def7d7f'
const USER_ID = '00000000-0000-0000-0000-000000000000'
const COMPONENT_ID = '00000000-0000-0000-0000-000000000000'
const DELETE_COMPONENT_ID = '22222222-0000-0000-0000-000000000000'

var tps = new TPS('', {
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFhYWFhYWFhLTlhMzQtNDQ2Ni1iYTRjLTQ2NDM4ZGVmN2Q3ZiIsImVtYWlsIjoiYW50aG9ueWJ1ZGRAaWRlZWEuY28udWsiLCJmaXJzdF9uYW1lIjoiQW50aG9ueSIsImxhc3RfbmFtZSI6IkJ1ZGQiLCJkaXNwbGF5X25hbWUiOiJBbnRob255IEJ1ZGQiLCJwcm9maWxlX2ltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS92MS91c2VyL3Byb2ZpbGUtaW1hZ2UvYW50aG9ueSUyMGJ1ZGQiLCJ0eXBlIjoiVVNFUiIsImRlbGV0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOm51bGwsInVwZGF0ZWRfYXQiOm51bGwsImdyb3VwcyI6W3siaWQiOiIwMDAwMDAwMC05YTM0LTQ0NjYtYmE0Yy00NjQzOGRlZjdkN2YiLCJyb2xlIjoiYWRtaW4ifV0sImlhdCI6MTU1NDU4MjgzMCwiZXhwIjozMTA5MjUyMDYwfQ.QqctNsAV4pmjij5T2rB0_dOGXjiKzvfbPLOgh-VHwpM',
    hostname: 'http://3ps.ideea.local/api/v1'
})

describe('Components', () => {

    describe('TPS.createComponent()', () => {
        it('Should return created component', done => {
            tps.components.create({ user_id: USER_ID, group_id: GROUP_ID }).then(component => {
                assert.isObject(component)
                done()
            })
                .catch(err => done(err))
        })
    })

    describe('TPS.getComponent()', () => {
        it('Should return specified component', done => {
            tps.components.get(COMPONENT_ID).then(component => {
                assert.isObject(component)
                done()
            })
                .catch(err => done(err))
        })
    })



    describe('TPS.updateComponent()', () => {
        it('Should update the component', done => {
            tps.components.update(DELETE_COMPONENT_ID, {
                user_id: USER_ID,
                group_id: GROUP_ID
            }).then(item => {
                assert.isObject(item)
                done()
            })
                .catch(err => done(err))
        })
    })

    describe('TPS.deleteComponent()', () => {
        it('Should update the current user', done => {
            tps.components.delete(DELETE_COMPONENT_ID).then(item => {
                assert.isObject(item)
                done()
            })
                .catch(err => done(err))
        })
    })
})
