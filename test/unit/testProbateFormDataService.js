'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const ProbateFormData = rewire('app/services/ProbateFormData');
const FormData = require('app/services/FormData');
const config = require('app/config');

describe('ProbateFormDataService', () => {
    describe('get()', () => {
        it('should call super.get()', (done) => {
            const endpoint = 'http://localhost';
            const userId = 'fred@example.com';
            const authToken = 'authToken';
            const serviceAuthorisation = 'serviceAuthorisation';
            const probateFormData = new ProbateFormData(endpoint, 'abc123');
            const path = probateFormData.replaceEmailInPath(config.services.orchestrator.paths.forms, userId);
            const getStub = sinon.stub(FormData.prototype, 'get');

            probateFormData.get(userId, authToken, serviceAuthorisation);

            expect(getStub.calledOnce).to.equal(true);
            expect(getStub.calledWith(
                'Get probate form data',
                endpoint + path + '?probateType=PA', authToken, serviceAuthorisation
            )).to.equal(true);

            getStub.restore();
            done();
        });
    });

    describe('post()', () => {
        it('should call super.post()', (done) => {
            const endpoint = 'http://localhost';
            const userId = 'fred@example.com';
            const ctx = {
                authToken: 'authToken',
                session: {
                    serviceAuthorization: 'serviceAuthorization'
                }
            };
            const data = {submissionReference: 'sub123'};
            const probateCcdCasePaymentStatus = new ProbateFormData(endpoint, 'abc123');
            const path = probateCcdCasePaymentStatus.replaceEmailInPath(config.services.orchestrator.paths.forms, userId);
            const postStub = sinon.stub(FormData.prototype, 'post');

            probateCcdCasePaymentStatus.post(userId, data, ctx);

            expect(postStub.calledOnce).to.equal(true);
            expect(postStub.calledWith(
                data,
                'Post probate form data',
                endpoint + path, ctx
            )).to.equal(true);

            postStub.restore();
            done();

        });
    });
});
