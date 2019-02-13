'use strict';

const {get} = require('lodash');
const FeesLookup = require('app/services/FeesLookup');
let feesLookup;
const issuesData = {
    amount_or_volume: 0,
    applicant_type: 'personal',
    channel: 'default',
    event: 'issue',
    jurisdiction1: 'family',
    jurisdiction2: 'probate registry',
    service: 'probate'
};

const copiesData = {
    amount_or_volume: 0,
    applicant_type: 'all',
    channel: 'default',
    event: 'copies',
    jurisdiction1: 'family',
    jurisdiction2: 'probate registry',
    service: 'probate'
};

class FeesCalculator {

    constructor(endpoint, sessionId) {
        this.endpoint = endpoint;
        this.sessionId = sessionId;
        feesLookup = new FeesLookup(this.endpoint, sessionId);
    }

    calc(formdata, authToken) {
        const headers = {
            authToken: authToken
        };
        return createCallsRequired(formdata, headers);
    }

}

async function createCallsRequired(formdata, headers) {
    const returnResult = {
        status: 'success',
        applicationfee: 0,
        applicationvalue: 0,
        ukcopies: 0,
        ukcopiesfee: 0,
        overseascopies: 0,
        overseascopiesfee: 0,
        total: 0
    };

    issuesData.amount_or_volume = get(formdata, 'iht.netValue', 0);
    if (issuesData.amount_or_volume > 0) {
        await feesLookup.get(issuesData, headers)
            .then((res) => {
                if (identifyAnyErrors(res)) {
                    returnResult.status = 'failed';
                } else {
                    returnResult.applicationfee = res.fee_amount;
                    returnResult.applicationvalue = issuesData.amount_or_volume;
                    returnResult.total += res.fee_amount;
                }
            });
    }

    copiesData.amount_or_volume = get(formdata, 'copies.uk', 0);
    if (copiesData.amount_or_volume > 0) {
        await feesLookup.get(copiesData, headers)
            .then((res) => {
                if (identifyAnyErrors(res)) {
                    returnResult.status = 'failed';
                } else {
                    returnResult.ukcopiesfee = res.fee_amount;
                    returnResult.ukcopies = copiesData.amount_or_volume;
                    returnResult.total += res.fee_amount;
                }
            });
    }

    copiesData.amount_or_volume = get(formdata, 'copies.overseas', 0);
    if (copiesData.amount_or_volume > 0) {
        await feesLookup.get(copiesData, headers)
            .then((res) => {
                if (identifyAnyErrors(res)) {
                    returnResult.status = 'failed';
                } else {
                    returnResult.overseascopiesfee = res.fee_amount;
                    returnResult.overseascopies = copiesData.amount_or_volume;
                    returnResult.total += res.fee_amount;
                }
            });
    }

    return returnResult;
}

/*
 * was not found  - equivalent to a return status of 404
 * FetchError - is returned when fees api is down
 */
function identifyAnyErrors(res) {
    const callResult = JSON.stringify(res);
    if (callResult.includes('FetchError') ||
        callResult.toLocaleLowerCase().includes('was not found')) {
        return true;
    }
    return false;
}

module.exports = FeesCalculator;
