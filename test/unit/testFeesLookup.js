'use strict';

const chai = require('chai');
const expect = chai.expect;
const FeesLookup = require('app/services/FeesLookup');
const config = require('app/config');

describe('FeesLookup', () => {
    describe('get FeesLookup ()', () => {
        it('should return a list of probate fees', (done) => {
            const expectedResponse = require('test/data/paymentfees/paymentfeeslookup-response');
            const feesLookup = new FeesLookup(config.services.feesRegister.url, 'dummyId');
            const headers = {
                authToken: 'dummyToken'
            };
            const data = {
                amount_or_volume: '1',
                applicant_type: 'all',
                channel: 'default',
                event: 'copies',
                jurisdiction1: 'family',
                jurisdiction2: 'probate registry',
                service: 'probate'
            };
            feesLookup
                .get(data, headers)
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });
        });
    });

});
