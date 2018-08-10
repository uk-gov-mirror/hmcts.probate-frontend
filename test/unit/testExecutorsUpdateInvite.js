'use strict';
const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');

describe('Update-Invite', function () {
    let ctx;
    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
    const updateInvite = steps.ExecutorsUpdateInvite;

    it('test correct url is returned from getUrl function', () => {
        assert.equal(updateInvite.constructor.getUrl(), '/executors-update-invite');
    });

    describe('getContextData', () => {
        it('test ctx variables are correctly assigned when there are more than one executor with new email', (done) => {
            const req = {
                session: {
                    form: {
                        executors: {
                            'executorsNumber': 3,
                            'invitesSent': 'true',
                            'list': [
                                {'fullName': 'john', 'isApplying': true, 'isApplicant': true},
                                {'fullName': 'other applicant', 'isApplying': true, 'emailChanged': true},
                                {'fullName': 'harvey', 'isApplying': true, 'emailChanged': true}
                            ]
                        }
                    }
                }
            };

            ctx = updateInvite.getContextData(req);
            expect(ctx.executorsEmailChangedList).to.deep.equal([
                {
                    'emailChanged': true,
                    'fullName': 'other applicant',
                    'isApplying': true
                },
                {
                    'emailChanged': true,
                    'fullName': 'harvey',
                    'isApplying': true
                }
            ]);
            expect(ctx.notifyExecutorsSuffix).to.deep.equal('-multiple');
            done();
        });

        it('test ctx variables are correctly assigned when there is only one executor with new email', (done) => {
            const req = {
                session: {
                    form: {
                        executors: {
                            'executorsNumber': 3,
                            'invitesSent': 'true',
                            'list': [
                                {'fullName': 'john', 'isApplying': true, 'isApplicant': true},
                                {'fullName': 'other applicant', 'isApplying': true, 'emailChanged': true},
                                {'fullName': 'harvey', 'isApplying': true}
                            ]
                        }
                    }
                }
            };

            ctx = updateInvite.getContextData(req);
            expect(ctx.executorsEmailChangedList).to.deep.equal([
                {
                    'emailChanged': true,
                    'fullName': 'other applicant',
                    'isApplying': true
                }
            ]);
            expect(ctx.notifyExecutorsSuffix).to.deep.equal('');
            done();
        });
    });
});
