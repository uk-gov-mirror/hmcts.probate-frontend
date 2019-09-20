'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const PaymentSubmission = require('app/services/PaymentSubmissions');

describe('PaymentSubmissionsService', () => {
    it('post() should call log(), fetchOptions() and fetchJson()', (done) => {
        const logMessage = 'Test message';
        const ccdCaseId = 1234567890123456;
        const authToken = 'auth_token';
        const serviceToken = 'service_token';
        const caseType = 'gop';

        const endpoint = 'http://localhost';
        const fetchOptions = {method: 'POST'};
        const paymentSubmission = new PaymentSubmission(endpoint, 'abc123');
        const logSpy = sinon.spy(paymentSubmission, 'log');
        const fetchOptionsStub = sinon.stub(paymentSubmission, 'fetchOptions').returns(fetchOptions);
        const fetchJsonSpy = sinon.spy(paymentSubmission, 'fetchJson');

        paymentSubmission.post(logMessage, ccdCaseId, authToken, serviceToken, 'hostname', caseType);

        expect(paymentSubmission.log.calledOnce).to.equal(true);
        expect(paymentSubmission.log.calledWith(logMessage)).to.equal(true);
        expect(paymentSubmission.fetchJson.calledOnce).to.equal(true);
        expect(paymentSubmission.fetchJson.calledWith(`${endpoint}/forms/${ccdCaseId}/payment-submissions?probateType=PA`, fetchOptions)).to.equal(true);

        logSpy.restore();
        fetchJsonSpy.restore();
        fetchOptionsStub.restore();
        done();
    });

    it('put() should call log(), fetchOptions() and fetchJson()', (done) => {
        const logMessage = 'Test message';
        const ccdCaseId = 1234567890123456;
        const authToken = 'auth_token';
        const serviceToken = 'service_token';
        const caseType = 'gop';

        const endpoint = 'http://localhost';
        const fetchOptions = {method: 'PUT'};
        const paymentSubmission = new PaymentSubmission(endpoint, 'abc123');
        const logSpy = sinon.spy(paymentSubmission, 'log');
        const fetchOptionsStub = sinon.stub(paymentSubmission, 'fetchOptions').returns(fetchOptions);
        const fetchJsonSpy = sinon.spy(paymentSubmission, 'fetchJson');

        paymentSubmission.put(logMessage, ccdCaseId, authToken, serviceToken, caseType);

        expect(paymentSubmission.log.calledOnce).to.equal(true);
        expect(paymentSubmission.log.calledWith(logMessage)).to.equal(true);
        expect(paymentSubmission.fetchJson.calledOnce).to.equal(true);
        expect(paymentSubmission.fetchJson.calledWith(`${endpoint}/forms/${ccdCaseId}/payment-submissions?probateType=PA`, fetchOptions)).to.equal(true);

        logSpy.restore();
        fetchJsonSpy.restore();
        fetchOptionsStub.restore();
        done();
    });
});
