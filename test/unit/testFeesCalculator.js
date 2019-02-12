'use strict';

const {assert, expect} = require('chai');
const FeesCalculator = require('app/utils/FeesCalculator');
const sinon = require('sinon');
const Service = require('app/services/Service');
let feesCalculator;
let formdata;
let promiseStub;
let feesLookupStub;

describe('FeesCalculator', () => {
    describe('calc()', () => {

        beforeEach(() => {
            feesCalculator = new FeesCalculator('http://localhost', 'dummyId');
            formdata = {
                iht: {
                    netValue: 6000
                },
                copies: {
                    uk: 1,
                    overseas: 2
                }
            };
            promiseStub = sinon.stub(Promise, 'all');
            feesLookupStub = sinon.stub(Service.prototype, 'fetchJson');
        });

        afterEach(() => {
            promiseStub.restore();
            feesLookupStub.restore();
        });

        it('should return a list of probate fees when fees api service is available', (done) => {
            const expectedResponse =
                [
                    {
                        'code': 'FEE0219',
                        'description': 'Application for a grant of probate (Estate over £5000)',
                        'version': 3,
                        'fee_amount': 155
                    },
                    {
                        'code': 'FEE0003',
                        'description': 'Additional copies of the grant representation',
                        'version': 3,
                        'fee_amount': 0.5
                    },
                    {
                        'code': 'FEE0003',
                        'description': 'Additional copies of the grant representation',
                        'version': 3,
                        'fee_amount': 1
                    }
                ];


            promiseStub.returns(Promise.resolve(expectedResponse));
            feesLookupStub.returns(Promise.resolve(''));

            const url = ['http://localhost/fees/lookup?amount_or_volume=6000&applicant_type=personal&channel=default&event=issue&jurisdiction1=family&jurisdiction2=probate+registry&service=probate',
                'http://localhost/fees/lookup?amount_or_volume=1&applicant_type=all&channel=default&event=copies&jurisdiction1=family&jurisdiction2=probate+registry&service=probate',
                'http://localhost/fees/lookup?amount_or_volume=2&applicant_type=all&channel=default&event=copies&jurisdiction1=family&jurisdiction2=probate+registry&service=probate'];

            feesCalculator.calc(formdata, 'dummyToken')
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    sinon.assert.calledThrice(feesLookupStub);
                });
            assert.equal(feesLookupStub.getCall(0).args[0], url[0]);
            assert.equal(feesLookupStub.getCall(1).args[0], url[1]);
            assert.equal(feesLookupStub.getCall(2).args[0], url[2]);
            done();
        });

        it('should return a list of errors when fees api service is unavailable', (done) => {

            const expectedResponse =
                ['Error:FetchError: request to http://localhost/fees/lookup?amount_or_volume=6000&applicant_type=personal&channel=default&event=issue&jurisdiction1=family&jurisdiction2=probate+registry&service=probate failed, reason: connect ECONNREFUSED 127.0.0.1:80',
                 'Error:FetchError: request to http://localhost/fees/lookup?amount_or_volume=1&applicant_type=all&channel=default&event=copies&jurisdiction1=family&jurisdiction2=probate+registry&service=probate failed, reason: connect ECONNREFUSED 127.0.0.1:80',
                    'Error:FetchError: request to http://localhost/fees/lookup?amount_or_volume=2&applicant_type=all&channel=default&event=copies&jurisdiction1=family&jurisdiction2=probate+registry&service=probate failed, reason: connect ECONNREFUSED 127.0.0.1:80'
                ];

            promiseStub.returns(Promise.resolve(expectedResponse));
            feesLookupStub.returns(Promise.resolve(''));

            feesCalculator.calc(formdata, 'dummyToken')
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });
        });
    });

});
