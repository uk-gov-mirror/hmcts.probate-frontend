'use strict';

const {expect} = require('chai');
const FormData = require('app/services/FormData');
const co = require('co');
const caseTypes = require('app/utils/CaseTypes');
const config = require('app/config');
const nock = require('nock');

describe('FormDataService', () => {

    describe('should call', () => {
        afterEach(() => {
            nock.cleanAll();
        });

        it('get() successfully', (done) => {
            const endpoint = 'http://localhost';
            const userId = 'fred@example.com';
            const expectedForm = {id: '1234', deceased: {name: 'test'}};
            const authToken = 'authToken';
            const serviceAuthorisation = 'serviceAuthorisation';
            const formData = new FormData(endpoint, 'abc123');
            const path = formData.replaceIdInPath(config.services.orchestrator.paths.forms, userId);
            nock(endpoint, {
                reqheaders: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                    ServiceAuthorization: serviceAuthorisation
                }
            }
            ).get(path + '?probateType=PA')
                .reply(200, expectedForm);

            co(function* () {
                const actualForm = yield formData.get(userId, authToken, serviceAuthorisation, caseTypes.GOP);
                expect(actualForm).to.deep.equal(expectedForm);
                done();
            }).catch(err => {
                done(err);
            });
        });

        it('should call post() successfully', (done) => {
            const endpoint = 'http://localhost';
            const id = 'fred@example.com';
            const inputForm = {id: '1234', deceased: {name: 'test'}};
            const expectedForm = {type: caseTypes.GOP, id: '1234', deceased: {name: 'test'}};
            const authToken = 'authToken';
            const serviceAuthorisation = 'serviceAuthorisation';
            const formData = new FormData(endpoint, 'abc123');
            const path = formData.replaceIdInPath(config.services.orchestrator.paths.forms, id);
            nock(endpoint, {
                reqheaders: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                    ServiceAuthorization: serviceAuthorisation
                }
            }
            ).post(path, expectedForm)
                .reply(200, expectedForm);

            co(function* () {
                const actualForm = yield formData.post(id, inputForm, authToken, serviceAuthorisation, caseTypes.GOP);
                expect(actualForm).to.deep.equal(expectedForm);
                done();
            }).catch(err => {
                done(err);
            });

        });
    });
});
