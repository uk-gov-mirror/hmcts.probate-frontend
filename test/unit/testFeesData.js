'use strict';

const {expect} = require('chai');
const Fees = require('app/services/FeesData');
const co = require('co');
const caseTypes = require('app/utils/CaseTypes');
const config = require('app/config');
const nock = require('nock');

describe('FeesData', () => {

    describe('should call', () => {
        afterEach(() => {
            nock.cleanAll();
        });

        it('updateFees successfully', (done) => {
            const endpoint = 'http://localhost';
            const userId = 'fred@example.com';
            const result = {id: 'fees123'};
            const data = {applicantEmail: userId};
            const authToken = 'authToken';
            const serviceAuthorisation = 'serviceAuthorisation';
            const fees = new Fees(endpoint, 'abc123');
            const path = fees.replaceIdInPath(config.services.orchestrator.paths.fees, userId);
            nock(endpoint, {
                reqheaders: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                    ServiceAuthorization: serviceAuthorisation
                }
            }
            ).post(path + '?probateType=PA')
                .reply(200, result);

            co(function* () {
                const actualForm = yield fees.updateFees(data, authToken, serviceAuthorisation, caseTypes.GOP);
                expect(actualForm).to.deep.equal(result);
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
});
