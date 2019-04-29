'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const ProbateSubmitData = rewire('app/services/ProbateSubmitData');
const SubmitData = require('app/services/SubmitData');
const config = require('app/config');

describe('ProbateSubmitDataService', () => {
    describe('put()', () => {
        it('should call super.put()', (done) => {
            const endpoint = 'http://localhost';
            const data = {applicant: {email: 'fred@example.com'}};
            const authToken = 'authToken';
            const serviceAuthorisation = 'serviceAuthorisation';
            const probateSubmitData = new ProbateSubmitData(endpoint, 'abc123');
            const path = probateSubmitData.replaceEmailInPath(config.services.orchestrator.paths.submissions, data.applicant.email);
            const putStub = sinon.stub(SubmitData.prototype, 'put');
            const url = endpoint + path + '?probateType=PA';

            probateSubmitData.put('Put submit data', url, data, authToken, serviceAuthorisation);

            expect(putStub.calledOnce).to.equal(true);
            expect(putStub.calledWith(
                'Put submit data',
                url, data, authToken, serviceAuthorisation
            )).to.equal(true);

            putStub.restore();
            done();
        });
    });
});
