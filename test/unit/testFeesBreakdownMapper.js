'use strict';

const chai = require('chai');
const expect = chai.expect;
const FeesBreakDownMapper = require('app/utils/FeesBreakDownMapper');
const config = require('app/config');

describe('FeesBreakDownMapper', () => {
    describe('calculateFeesBreakDownCost ()', () => {
        it('should return a list of probate fees and total', (done) => {

            const feesBreakDownMapper = new FeesBreakDownMapper(config.services.feesRegister.url, 'dummyId');
            const formdata = {
                iht: {
                    netValue: 6000
                },
                copies: {
                    uk: 1,
                    overseas: 2
                }
            };
            const expectedResponse = {
                status: 'success',
                applicationfee: 215,
                ukcopies: 1,
                ukcopiesfee: 0.50,
                overseascopies: 2,
                overseascopiesfee: 1,
                total: 216.50
            };

            feesBreakDownMapper.calculateBreakDownCost(formdata, 'dummyToken')
                .then((res) => {
                    expect(res).to.deep.equal(expectedResponse);
                    done();
                });
        });
    });

});
