'use strict';

const RemoveInvitedExecutor = require('app/utils/RemoveInvitedExecutor');
const services = require('app/components/services');
const {expect} = require('chai');
const sinon = require('sinon');

describe('RemoveInvitedExecutor.js', () => {
    describe('remove()', () => {
        let removeExecutorStub;
        let executors;

        beforeEach(() => {
            removeExecutorStub = sinon
                .stub(services, 'removeExecutor')
                .returns(Promise.resolve(''));
            executors = {
                executorsNumber: 4,
                list: [{
                    firstName: 'Bob Richard',
                    lastName: 'Smith',
                    isApplying: true,
                    isApplicant: true,
                }, {
                    fullName: 'executor_2_name',
                    isDead: true,
                    diedBefore: 'Yes',
                    notApplyingReason: 'This executor died (before the person who has died)',
                    notApplyingKey: 'optionDiedBefore',
                    isApplying: false,
                    hasOtherName: false,
                    inviteId: 'dummy_inviteId_1',
                }, {
                    fullName: 'executor_3_name',
                    isApplying: true,
                    hasOtherName: true,
                    currentName: 'exec_3_new_name',
                    email: 'haji58@hotmail.co.uk',
                    mobile: '07963723856',
                    address: 'exec_3_address\r\n',
                    freeTextAddress: 'exec_3_address\r\n',
                    inviteId: 'dummy_inviteId_2',
                }, {
                    fullName: 'executor_4_name',
                    isDead: false,
                    isApplying: false,
                    hasOtherName: false,
                    notApplyingReason: 'This executor doesn&rsquo;t want to apply now, and gives up the right to do so in the future (this is also known as renunciation, and the executor will need to fill in a form)',
                    notApplyingKey: 'optionRenunciated',
                    inviteId: 'dummy_inviteId_3',
                }],
                allalive: 'No',
                otherExecutorsApplying: 'Yes',
                alias: 'Yes',
                invitesSent: 'true',
                executorsRemoved: [{
                    fullName: 'executor_2_name',
                    isDead: true,
                    diedBefore: 'Yes',
                    notApplyingReason: 'This executor died (before the person who has died)',
                    notApplyingKey: 'optionDiedBefore',
                    isApplying: false,
                    hasOtherName: false,
                    inviteId: 'dummy_inviteId_1',
                }, {
                    fullName: 'executor_4_name',
                    isDead: false,
                    isApplying: false,
                    hasOtherName: false,
                    notApplyingReason: 'This executor doesn&rsquo;t want to apply now, and gives up the right to do so in the future (this is also known as renunciation, and the executor will need to fill in a form)',
                    notApplyingKey: 'optionRenunciated',
                    inviteId: 'dummy_inviteId_3',
                }]
            };
        });

        afterEach(() => {
            removeExecutorStub.restore();
        });

        describe('when there are executors to remove', () => {
            it('should delete executorsRemoved and inviteId for the non-applying executors', (done) => {
                delete executors.list[1].inviteId;
                delete executors.list[3].inviteId;
                RemoveInvitedExecutor.remove(executors).then(res => {
                    expect(res).to.deep.equal(executors);
                    done();
                })
                .catch(err => {
                    done(err);
                });
            });
        });

        describe('when there are no executors to remove', () => {
            it('should return the original executors data', (done) => {
                delete executors.list[1].inviteId;
                delete executors.list[3].inviteId;
                delete executors.executorsRemoved;
                RemoveInvitedExecutor.remove(executors).then(res => {
                    expect(res).to.deep.equal(executors);
                    done();
                })
                .catch(err => {
                    done(err);
                });
            });
        });
    });
});
