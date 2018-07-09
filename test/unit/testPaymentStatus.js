const initSteps = require('app/core/initSteps');
const assert = require('chai').assert;
const co = require('co');
const services = require('app/components/services');
const sinon = require('sinon');

describe('PaymentStatus', function () {

    const steps = initSteps([__dirname + '/../../app/steps/ui/']);
    let s2sAuthoriseStub;

    beforeEach(function () {
        s2sAuthoriseStub = sinon.stub(services, 'authorise');
    });

    afterEach(function () {
        s2sAuthoriseStub.restore();
    });

    describe('runnerOptions', function () {
        it('Should set paymentPending to unknown if an authorise failure', function (done) {
            s2sAuthoriseStub.returns(Promise.resolve({name: 'Error'}));
            const PaymentStatus = steps.PaymentStatus;
            const ctx = {total: 1};
            const formdata = {paymentPending: 'true'};
            let options = {};
            co(function* () {
                options = yield PaymentStatus.runnerOptions(ctx, formdata);
                assert.equal(options.redirect, true);
                assert.equal(options.url, '/payment-breakdown?status=failure');
                assert.equal(formdata.paymentPending, 'unknown');
                done();
            })
                .catch((err) => {
                done(err);
            });
        });
    });

    describe('sendApplication', function () {
        it('Should create an error if the sendApplication fails', function (done) {
            s2sAuthoriseStub.returns(Promise.resolve({name: 'Success'}));
            const PaymentStatus = steps.PaymentStatus;
            const ctx = {};
            const formdata = {};
            co(function * () {
                const errors = yield PaymentStatus.sendApplication(ctx, formdata);
                assert.exists(errors[0].msg, 'error message not found');
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('Should not create an error if sendApplication succeeds', function (done) {
            s2sAuthoriseStub.returns(Promise.resolve({name: 'Success'}));
            require('test/service-stubs/submit');
            const PaymentStatus = steps.PaymentStatus;
            const ctx = {};
            const formdata = {};
            co(function * () {
                const errors = yield PaymentStatus.sendApplication(ctx, formdata);
                assert.notExists(errors);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
