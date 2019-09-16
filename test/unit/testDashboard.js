'use strict';

const initSteps = require('app/core/initSteps');
const {assert, expect} = require('chai');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const Dashboard = steps.Dashboard;

describe('DeceasedDomicile', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = Dashboard.constructor.getUrl();
            expect(url).to.equal('/dashboard');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the correct context on GET', (done) => {
            const req = {
                method: 'GET',
                sessionID: 'dummy_sessionId',
                session: {
                    form: {
                        applications: [
                            'dummyApplication1',
                            'dummyApplication2',
                            'dummyApplication3'
                        ]
                    },
                    caseType: 'gop'
                }
            };
            const res = {};

            const ctx = Dashboard.getContextData(req, res);
            expect(ctx).to.deep.equal({
                sessionID: 'dummy_sessionId',
                applications: [
                    'dummyApplication1',
                    'dummyApplication2',
                    'dummyApplication3'
                ],
                caseType: 'gop',
                userLoggedIn: false
            });
            done();
        });
    });

    describe('handleGet()', () => {
        it('should return true when the isDashboard flag', (done) => {
            const ctxToTest = {};
            const [ctx] = Dashboard.handleGet(ctxToTest);
            expect(ctx.isDashboard).to.equal(true);
            done();
        });
    });

    describe('action()', () => {
        it('test it cleans up context', () => {
            const ctx = {
                applications: [
                    'dummyApplication1',
                    'dummyApplication2',
                    'dummyApplication3'
                ]
            };
            Dashboard.action(ctx);
            assert.isUndefined(ctx.applications);
        });
    });
});
