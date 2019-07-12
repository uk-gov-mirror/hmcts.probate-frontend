'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const IntestacySubmitData = rewire('app/services/IntestacySubmitData');
const SubmitData = require('app/services/SubmitData');
const config = require('app/config');

describe('IntestacySubmitDataService', () => {
    describe('put()', () => {
        it('should call super.post()', (done) => {
            const submitData = {applicantFirstName: 'Fred'};
            const revert = IntestacySubmitData.__set__('submitData', sinon.stub().returns(submitData));
            const endpoint = 'http://localhost';
            const authToken = 'authToken';
            const serviceAuthorisation = 'serviceAuthorisation';
            const data = {applicantEmail: 'fred@example.com'};
            const intestacySubmitData = new IntestacySubmitData(endpoint, 'abc123');
            const path = intestacySubmitData.replaceEmailInPath(config.services.orchestrator.paths.submissions, data.applicantEmail);
            const putStub = sinon.stub(SubmitData.prototype, 'put');
            const url = endpoint + path + '?probateType=Intestacy';

            intestacySubmitData.put('Put submit data', url, data, authToken, serviceAuthorisation);

            expect(putStub.calledOnce).to.equal(true);
            expect(putStub.calledWith(
                'Put submit data',
                url, data, authToken, serviceAuthorisation
            )).to.equal(true);

            putStub.restore();
            revert();
            done();
        });
    });
});
