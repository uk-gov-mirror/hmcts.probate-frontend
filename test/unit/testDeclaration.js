/*global describe, it, before, beforeEach, after, afterEach */
'use strict';
const assert = require('chai').assert;
const initSteps = require('app/core/initSteps');
const services = require('app/components/services');
const sinon = require('sinon');
const when = require('when');

describe('invitedata tests', function () {
    let ctx;
    let updateInviteDataStub;
    let removeExecutorStub;
    const Declaration = initSteps([__dirname + '/../../app/steps/action/', __dirname + '/../../app/steps/ui']).Declaration;

    const executorsInvited = [
        {inviteId: '1'},
        {inviteId: '2'},
        {inviteId: '3'}
    ];

    beforeEach(function () {
        updateInviteDataStub = sinon.stub(services, 'updateInviteData');
    });

    afterEach(function () {
        updateInviteDataStub.restore();
    });

    it('Success - there are no Errors in the results', (done) => {
        updateInviteDataStub.returns(Promise.resolve({agreed: null}));
        Declaration.resetAgreedFlags(executorsInvited).then((results) => {
            assert.isFalse(results.some(result => result.name === 'Error'));
            done();
        })
        .catch(err => done(err));
    });

    it('Failure - there is an Error in the results', (done) => {
        updateInviteDataStub.returns(Promise.resolve(new Error('Blimey')));
        Declaration.resetAgreedFlags(executorsInvited).then((results) => {
            assert.isTrue(results.some(result => result.name === 'Error'));
            done();
        })
        .catch(err => done(err));
    });

    describe('handlePost', () => {
        beforeEach(() => {
            ctx = {
                list: [
                    {'fullName': 'john', 'isApplying': true, 'isApplicant': true},
                    {'fullName': 'other applicant', 'isApplying': true, 'isApplicant': false, 'inviteId': 'dummy_inviteId_1'},
                    {'fullName': 'harvey', 'isApplying': false, 'isApplicant': true, 'inviteId': 'dummy_inviteId_2'}
                ],
                executorsNumber: 3,
                executorsToRemoveFromInviteData: [
                    {'fullName': 'harvey', 'isApplying': false, 'isApplicant': true, 'inviteId': 'dummy_inviteId_2'}
                ],
                invitesSent: 'true'
            };
            removeExecutorStub = sinon.stub(services, 'removeExecutor');
        });

        afterEach(() => {
            removeExecutorStub.restore();
        });

        it('Removes executors from invitedata table when they are no longer dealing with the estate', () => {
            removeExecutorStub.returns(when(Promise.resolve({name: 'success!'})));
            [ctx] = Declaration.handlePost(ctx);
            sinon.assert.called(removeExecutorStub);
        });
    });
});
