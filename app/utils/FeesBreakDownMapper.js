'use strict';

const {get} = require('lodash');
const FeesCalculator = require('app/utils/FeesCalculator');
let feesCalculator;

class FeesBreakDownMapper {

    constructor(endpoint, sessionId) {
        this.endpoint = endpoint;
        this.sessionId = sessionId;
        feesCalculator = new FeesCalculator(this.endpoint, sessionId);
    }

    calculateBreakDownCost(formdata, authToken) {
        return feesCalculator.calc(formdata, authToken)
            .then((res) => {
                if (res.toLocaleString().includes('FetchError')) {
                    return {status: 'failed'};
                }
                const result = {
                    status: 'success',
                    applicationfee: res[0].fee_amount,
                    ukcopies: get(formdata, 'copies.uk', 0),
                    ukcopiesfee: res.length > 1 ? res[1].fee_amount : 0,
                    overseascopies: get(formdata, 'copies.overseas', 0),
                    overseascopiesfee: res.length > 2 ? res[2].fee_amount : 0
                };
                result.total = result.applicationfee + result.ukcopiesfee + result.overseascopiesfee;
                return result;
            });
    }

}

module.exports = FeesBreakDownMapper;
