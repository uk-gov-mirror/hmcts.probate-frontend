'use strict';

const {expect} = require('chai');
const FeesBreakDownMapper = require('app/utils/FeesBreakDownMapper');
const sinon = require('sinon');
const Service = require('app/services/Service');
let feesBreakDownMapper;
let formdata;
let promiseStub;
let feesLookupStub;

describe('FeesBreakDownMapper', () => {
    describe('calculateFeesBreakDownCost ()', () => {

        beforeEach(() => {
            feesBreakDownMapper = new FeesBreakDownMapper('http://localhost', 'dummyId');
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

        it('should return a summary of probate fees and total', (done) => {

            const promiseResponse =
                [
                    {
                        'code': 'FEE0219',
                        'description': 'Application for a grant of probate (Estate over £5000)',
                        'version': 3,
                        'fee_amount': 215
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

            const expectedResponse = {
                status: 'success',
                applicationfee: 215,
                ukcopies: 1,
                ukcopiesfee: 0.50,
                overseascopies: 2,
                overseascopiesfee: 1,
                total: 216.50
            };


            promiseStub.returns(Promise.resolve(promiseResponse));
            feesLookupStub.returns(Promise.resolve(''));

            feesBreakDownMapper.calculateBreakDownCost(formdata, 'dummyToken')
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });

        });

        it('should return a failed summary when fee api service is down', (done) => {

            const promiseResponse =
                ['Error:FetchError: request to http://localhost/fees/lookup?amount_or_volume=6000&applicant_type=personal&channel=default&event=issue&jurisdiction1=family&jurisdiction2=probate+registry&service=probate failed, reason: connect ECONNREFUSED 127.0.0.1:80',
                    'Error:FetchError: request to http://localhost/fees/lookup?amount_or_volume=1&applicant_type=all&channel=default&event=copies&jurisdiction1=family&jurisdiction2=probate+registry&service=probate failed, reason: connect ECONNREFUSED 127.0.0.1:80',
                    'Error:FetchError: request to http://localhost/fees/lookup?amount_or_volume=2&applicant_type=all&channel=default&event=copies&jurisdiction1=family&jurisdiction2=probate+registry&service=probate failed, reason: connect ECONNREFUSED 127.0.0.1:80'
                ];

            const expectedResponse = {
                status: 'failed',
            };

            promiseStub.returns(Promise.resolve(promiseResponse));
            feesLookupStub.returns(Promise.resolve(''));

            feesBreakDownMapper.calculateBreakDownCost(formdata, 'dummyToken')
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });
        });
    });

});
