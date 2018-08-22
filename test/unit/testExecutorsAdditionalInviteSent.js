'use strict';
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');

describe('Executor-Additional-Invite-Sent', function () {
    let ctx;
    let req;
    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
    const executorsAdditionalInviteSent = steps.ExecutorsAdditionalInviteSent;

    describe('getContextData()', () => {
        beforeEach(() => {
            req = {
                sessionID: 'dummy_sessionId',
                session: {
                    form: {
                        executors: {}
                    }
                }
            };
        });

        it('test that context variables are removed and empty object returned', () => {
            req.session.form.executors = {
                executorsToNotifyList: [
                    {'fullName': 'other applicant', 'isApplying': true}
                ]
            };
            ctx = executorsAdditionalInviteSent.getContextData(req);
            expect(ctx).to.deep.equal({
                'executorsToNotifyList': [
                    {
                        'fullName': 'other applicant',
                        'isApplying': true
                    }
                ],
                'inviteSuffix': '',
                'sessionID': 'dummy_sessionId'
            });
        });

        it('test that context variables are removed and object contains only appropriate variables', () => {
            req.session.form.executors = {
                executorsToNotifyList: [
                    {'fullName': 'other applicant', 'isApplying': true},
                    {'fullName': 'harvey', 'isApplying': true}
                ]
            };
            ctx = executorsAdditionalInviteSent.getContextData(req);
            expect(ctx).to.deep.equal({
                'executorsToNotifyList': [
                    {
                        'fullName': 'other applicant',
                        'isApplying': true
                    },
                    {
                        'fullName': 'harvey',
                        'isApplying': true
                    }
                ],
                'inviteSuffix': '-multiple',
                'sessionID': 'dummy_sessionId'
            });
        });
    });

    describe('action()', () => {
        beforeEach(() => {
            ctx = {
                executorsToNotifyList: [
                    {'fullName': 'other applicant', 'isApplying': true},
                    {'fullName': 'harvey', 'isApplying': true}
                ],
                inviteSuffix: '-multiple'
            };
        });

        it('test that context variables are removed and empty object returned', () => {
            let formdata = {
                executors: {
                    executorsToNotifyList: [
                        {'fullName': 'other applicant', 'isApplying': true},
                        {'fullName': 'harvey', 'isApplying': true}
                    ]
                }
            };
            [ctx, formdata] = executorsAdditionalInviteSent.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
            expect(formdata).to.deep.equal({'executors': {}});
        });

        it('test that context variables are removed and object contains only appropriate variables', () => {
            let formdata = {
                executors: {
                    executorsToNotifyList: [
                        {'fullName': 'other applicant', 'isApplying': true},
                        {'fullName': 'harvey', 'isApplying': true}
                    ]
                }
            };
            ctx.invitesSent = 'true';
            [ctx, formdata] = executorsAdditionalInviteSent.action(ctx, formdata);
            expect(ctx).to.deep.equal({invitesSent: 'true'});
            expect(formdata).to.deep.equal({'executors': {}});
        });
    });
});
