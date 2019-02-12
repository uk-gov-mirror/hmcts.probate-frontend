'use strict';

const chai = require('chai');
const expect = chai.expect;
const Fees = require('app/services/Fees');
const config = require('app/config');
const sinon = require('sinon');

describe('Fees', () => {
    describe('get Fees ()', () => {
        it('should return the correct payment fee amount', (done) => {
            const expectedResponse = require('test/data/paymentfees/paymentfees-response');
            const fees = new Fees(config.services.feesRegister.url, 'dummyId');
            const headers = {
                authToken: 'dummyToken'
            };
            const data = {
                applicant_type: 'personal',
                jurisdiction1: 'family',
                service: 'probate'
            };
            const fetchOptions = {method: 'GET', headers: headers};
            fees.log = sinon.spy();
            fees.fetchJson = sinon.spy();
            fees.fetchOptions = sinon.stub().returns(fetchOptions);
            fees.get(data, headers)
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });
        });
    });

});
