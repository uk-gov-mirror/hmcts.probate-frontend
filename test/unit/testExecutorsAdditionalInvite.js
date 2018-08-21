'use strict';
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');

describe.only('Executor-Additional-Invite', function () {
    let ctx;
    let req;
    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
    const executorsAdditionalInvite = steps.ExecutorsAdditionalInvite;

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
                list: [
                    {'fullName': 'john', 'isApplying': true, 'isApplicant': true},
                    {'fullName': 'other applicant', 'isApplying': true, 'emailSent': true},
                    {'fullName': 'harvey', 'isApplying': true, 'emailSent': false}]
            };
            ctx = executorsAdditionalInvite.getContextData(req);
            expect(ctx).to.deep.equal({
                'executorsToNotifyList': [
                    {
                        'emailSent': false,
                        'fullName': 'harvey',
                        'isApplying': true
                    }
                ],
                'inviteSuffix': '',
                'list': [
                    {
                        'fullName': 'john',
                        'isApplicant': true,
                        'isApplying': true
                    },
                    {
                        'emailSent': true,
                        'fullName': 'other applicant',
                        'isApplying': true
                    },
                    {
                        'emailSent': false,
                        'fullName': 'harvey',
                        'isApplying': true
                    }
                ],
                'sessionID': 'dummy_sessionId'
            });
        });

        it('test that context variables are removed and object contains only appropriate variables', () => {
            req.session.form.executors = {
                list: [
                    {'fullName': 'john', 'isApplying': true, 'isApplicant': true},
                    {'fullName': 'other applicant', 'isApplying': true, 'emailSent': false},
                    {'fullName': 'harvey', 'isApplying': true, 'emailSent': false}
                ]
            };
            ctx = executorsAdditionalInvite.getContextData(req);
            expect(ctx).to.deep.equal({
                'executorsToNotifyList': [
                    {
                        'emailSent': false,
                        'fullName': 'other applicant',
                        'isApplying': true
                    },
                    {
                        'emailSent': false,
                        'fullName': 'harvey',
                        'isApplying': true
                    }
                ],
                'inviteSuffix': '-multiple',
                'list': [
                    {
                        'fullName': 'john',
                        'isApplicant': true,
                        'isApplying': true
                    },
                    {
                        'emailSent': false,
                        'fullName': 'other applicant',
                        'isApplying': true
                    },
                    {
                        'emailSent': false,
                        'fullName': 'harvey',
                        'isApplying': true
                    }
                ],
                'sessionID': 'dummy_sessionId'
            });
        });
    });

    describe('action()', () => {
        beforeEach(() => {
            ctx = {
                inviteSuffix: ''
            };
        });

        it('test that inviteSuffix removed when is an empty string and empty object returned', () => {
            let formdata = {};
            [ctx, formdata] = executorsAdditionalInvite.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });

        it('test that inviteSuffix removed when is -multiple and empty object returned', () => {
            let formdata = {};
            ctx.inviteSuffix = '-multiple';
            [ctx, formdata] = executorsAdditionalInvite.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });

        it('test that context variables are removed and object contains only appropriate variables', () => {
            let formdata = {};
            ctx.invitesSent = 'true';
            [ctx, formdata] = executorsAdditionalInvite.action(ctx, formdata);
            expect(ctx).to.deep.equal({invitesSent: 'true'});
        });
    });
});
