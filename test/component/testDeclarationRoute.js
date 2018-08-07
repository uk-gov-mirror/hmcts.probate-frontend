'use strict';

const {assert} = require('chai');
const services = require('app/components/services');
const sinon = require('sinon');
const TestWrapper = require('test/util/TestWrapper');

describe.only('declaration.js', () => {
    let req;
    let testWrapper;
    let executorsToRemoveStub;

    beforeEach(() => {
        testWrapper = new TestWrapper('Declaration');
        executorsToRemoveStub = sinon.stub(services, 'removeExecutor');
        req = {
            'session': {
                'form': {
                    'executors': {
                        'executorsNumber': 4,
                        'list': [{
                            'firstName': 'Bob Richard',
                            'lastName': 'Smith',
                            'isApplying': true,
                            'isApplicant': true
                        }, {
                            'fullName': 'executor_2_name',
                            'isDead': true,
                            'diedBefore': 'Yes',
                            'notApplyingReason': 'This executor died (before the person who has died)',
                            'notApplyingKey': 'optionDiedBefore',
                            'isApplying': false,
                            'hasOtherName': false,
                            'inviteId': 'dummy_inviteId_1',
                        }, {
                            'fullName': 'executor_3_name',
                            'isApplying': true,
                            'hasOtherName': true,
                            'currentName': 'exec_3_new_name ',
                            'email': 'haji58@hotmail.co.uk',
                            'mobile': '07963723856',
                            'address': 'exec_3_address\r\n',
                            'freeTextAddress': 'exec_3_address\r\n',
                            'inviteId': 'dummy_inviteId_2',
                        }, {
                            'fullName': 'executor_4_name',
                            'isDead': false,
                            'isApplying': false,
                            'hasOtherName': false,
                            'notApplyingReason': 'This executor doesn&rsquo;t want to apply now, and gives up the right to do so in the future (this is also known as renunciation, and the executor will need to fill in a form)',
                            'notApplyingKey': 'optionRenunciated',
                            'inviteId': 'dummy_inviteId_3',
                        }],
                        'allalive': 'No',
                        'otherExecutorsApplying': 'Yes',
                        'alias': 'Yes',
                        'invitesSent': 'true'
                    }
                }
            }
        };
    });

    afterEach(() => {
        executorsToRemoveStub.restore();
        testWrapper.destroy();
    });

    it('executorsRemoved should be deleted', (done) => {
        executorsToRemoveStub.returns((Promise.resolve('')));
        testWrapper.agent.post('/prepare-session/form')
            .send(req.session.form)
            .end(() => {
                req = sinon.spy();
                testWrapper.agent.post('/declaration')
                    .end((err, res) => {
                        if (err) {
                            throw err;
                        }
                        assert(res.status === 200);
                        assert.isTrue(executorsToRemoveStub.called);
                        sinon.assert.called(req);
                        done();
                    });
            });
    });

    // it('removeExecutor should throw an error', function (done) {
    //     const expectedError = new Error('Error while deleting executor from invitedata table.');
    //     executorsToRemoveStub.returns(when(expectedError));
    //     testWrapper.agent.post('/prepare-session/form')
    //         .send(req.session.form)
    //         .end(() => {
    //             testWrapper.agent.post('/declaration')
    //                 .end(err => {
    //                     assert.strictEqual(expectedError, err);
    //                     done();
    //                 })
    //                 .catch(done);
    //         });
    // });

    it('executorsToRemove should not be called', (done) => {
        req.session.form.executors.list[1].isApplying = true;
        req.session.form.executors.list[3].isApplying = true;
        testWrapper.agent.post('/prepare-session/form')
            .send(req.session.form)
            .end(() => {
                testWrapper.agent.post('/declaration')
                    .end((err, res) => {
                        if (err) {
                            throw err;
                        }
                        assert(res.status === 200);
                        assert.isFalse(executorsToRemoveStub.called);
                        done();
                    });
            });
    });
});
