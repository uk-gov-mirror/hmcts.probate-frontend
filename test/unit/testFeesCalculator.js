'use strict';

const chai = require('chai');
const expect = chai.expect;
const FeesCalculator = require('app/utils/FeesCalculator');
const config = require('app/config');

describe('FeesCalculator', () => {
    describe('calc ()', () => {
        it('should return a list of probate fees and total', (done) => {

            const feesCalculator = new FeesCalculator(config.services.feesRegister.url, 'dummyId');
            const formdata = {
                iht: {
                    netValue: 6000
                },
                copies: {
                    uk: 1,
                    overseas: 2
                }
            };
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

            feesCalculator.calc(formdata, 'dummyToken')
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });
        });
    });

});
