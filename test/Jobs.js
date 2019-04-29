var { assert } = require('chai')
const TPS = require('../src')

const JOB_ID = '00000000-aaaa-aaaa-aaaa-aaaaaaaaaaab'
const GROUP_ID = '00000000-9a34-4466-ba4c-46438def7d7g'

var tps = new TPS('', {
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFhYWFhYWFhLTlhMzQtNDQ2Ni1iYTRjLTQ2NDM4ZGVmN2Q3ZiIsImVtYWlsIjoiYW50aG9ueWJ1ZGRAaWRlZWEuY28udWsiLCJmaXJzdF9uYW1lIjoiQW50aG9ueSIsImxhc3RfbmFtZSI6IkJ1ZGQiLCJkaXNwbGF5X25hbWUiOiJBbnRob255IEJ1ZGQiLCJwcm9maWxlX2ltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS92MS91c2VyL3Byb2ZpbGUtaW1hZ2UvYW50aG9ueSUyMGJ1ZGQiLCJ0eXBlIjoiVVNFUiIsImRlbGV0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOm51bGwsInVwZGF0ZWRfYXQiOm51bGwsImdyb3VwcyI6W3siaWQiOiIwMDAwMDAwMC05YTM0LTQ0NjYtYmE0Yy00NjQzOGRlZjdkN2YiLCJyb2xlIjoiYWRtaW4ifV0sImlhdCI6MTU1NDU4MjgzMCwiZXhwIjozMTA5MjUyMDYwfQ.QqctNsAV4pmjij5T2rB0_dOGXjiKzvfbPLOgh-VHwpM',
    hostname: 'http://3ps.ideea.local/api/v1'
})

describe('Jobs', () => {

    describe('TPS.createJob()', () => {
        it('Should create a single job', done => {
            tps.jobs.create({
                group_id: '00000000-9a34-4466-ba4c-46438def7d7f',
                components: [{
                    id: '00000000-0000-0000-0000-000000000000',
                    resolution: '0.5m',
                    material: 'pla',
                    color: 'blue',

                    source_item_id: 'blue',
                    source_item_index: 'blue',
                    source_item_index_of: 'blue',
                    source_item_componet_index: 'blue',
                    source_item_componet_index_of: 'blue',
                }]
            })
                .then(job => {
                    assert.isObject(job)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('TPS.getJob()', () => {
        it('Should return a single job', done => {
            tps.jobs.get(JOB_ID)
                .then(job => {
                    assert.isObject(job)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('TPS.getGroupById()', () => {
        it('Should return an array of jobs in a group', done => {
            tps.jobs.getByGroupID(GROUP_ID)
                .then(jobs => {
                    assert.isArray(jobs)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('TPS.createEvent()', () => {
        it('Should return an array of events in a job', done => {
            tps.jobs.createJobEvent(JOB_ID, 'This is an event')
                .then(events => {
                    assert.isArray(events)
                    done()
                })
                .catch(err => done(err))
        })
    })

    describe('TPS.getJobEvents()', () => {
        it('Should return an array of jobs in a group', done => {
            tps.jobs.getJobEvents(JOB_ID)
                .then(events => {
                    assert.isArray(events)
                    done()
                })
                .catch(err => done(err))
        })
    })
})
