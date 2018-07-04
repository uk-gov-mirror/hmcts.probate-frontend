'use strict';

const initSteps = require('app/core/initSteps');
const assert = require('chai').assert;
const config = require('test/config');
const co = require('co');

describe('PaymentBreakdown', () => {
    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
    let s2sStub, payStub;

    before(() => {
        config.s2sStubErrorSequence = '01';
        s2sStub = require('test/service-stubs/idam');
        payStub = require('test/service-stubs/payment');
    });

    after(() => {
        s2sStub.close();
        payStub.close();
        delete require.cache[require.resolve('test/service-stubs/idam')];
        delete require.cache[require.resolve('test/service-stubs/payment')];
    });

    describe('handleGet', () => {
        it('cleans up context', () => {
            const ctx = {
                paymentError: 'failure'
            };
            const PaymentBreakdown = steps.PaymentBreakdown;
            const [, errors] = PaymentBreakdown.handleGet(ctx);

            assert.deepEqual(errors[0].param, 'payment');
        });
    });

    describe('handlePost', () => {
        it('sets paymentPending to false if ctx.total = 0', (done) => {
            const PaymentBreakdown = steps.PaymentBreakdown;
            let ctx = {total: 0};
            let errors = [];
            const formdata = {};

            co(function* () {
                [ctx, errors] = yield PaymentBreakdown.handlePost(ctx, errors, formdata);
                assert.deepEqual(formdata.paymentPending, 'false');
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        it('sets nextStepUrl to payment-status if paymentPending is unknown', (done) => {
            const PaymentBreakdown = steps.PaymentBreakdown;
            let ctx = {total: 1};
            let errors = [];
            const formdata = {paymentPending: 'unknown'};

            co(function* () {
                [ctx, errors] = yield PaymentBreakdown.handlePost(ctx, errors, formdata);
                assert.equal(PaymentBreakdown.nextStepUrl(), '/payment-status');
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        it('sets paymentPending to true if ctx.total > 0', (done) => {
            const PaymentBreakdown = steps.PaymentBreakdown;
            const hostname = 'localhost';
            let ctx = {total: 215};
            let errors = [];
            const formdata = {};
            const session = {};

            /*eslint no-empty-function: 0*/
            session.save = () => {};
            co(function* () {
                [ctx, errors] = yield PaymentBreakdown.handlePost(ctx, errors, formdata, session, hostname);
                assert.deepEqual(formdata.paymentPending, 'true');
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        it('sets paymentPending and createPayment to undefined if authorise fails before createPayment', (done) => {
            const PaymentBreakdown = steps.PaymentBreakdown;
            const hostname = 'localhost';
            let ctx = {total: 215};
            let errors = [];
            const formdata = {};
            const session = {};

            /*eslint no-empty-function: 0*/
            session.save = () => {};
            co(function* () {
                [ctx, errors] = yield PaymentBreakdown.handlePost(ctx, errors, formdata, session, hostname);
                assert.exists(errors[0].msg, 'error message not found');
                assert.equal(formdata.paymentPending, null);
                assert.equal(formdata.creatingPayment, null);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });

    describe('action', () => {
        it('cleans up context', () => {
            let ctx = {
                _csrf: 'dummyCSRF',
                sessionID: 'dummySessionID',
                authToken: 'dummyAuthToken',
                paymentError: 'dummyError',
                deceasedLastName: 'aName'
            };
            const PaymentBreakdown = steps.PaymentBreakdown;
            [ctx] = PaymentBreakdown.action(ctx);
            assert.deepEqual(ctx, {});
        });
    });
});
