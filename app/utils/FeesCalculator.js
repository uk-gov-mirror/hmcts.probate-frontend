'use strict';

const {get} = require('lodash');
const FeesLookup = require('app/services/FeesLookup');
let feesLookup;
const issuesdata = {
    amount_or_volume: 0,
    applicant_type: 'personal',
    channel: 'default',
    event: 'issue',
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

        const calls = createCallsRequired(formdata);
        const promises = createPromises(calls, headers);
        return Promise.all(promises);
    }

}

function createCallsRequired(formdata) {
    let callList = [];
    issuesdata.amount_or_volume = get(formdata, 'iht.netValue', 0);
    callList.push(issuesdata);

    callList = createCallsForCopies(get(formdata, 'copies.uk', 0), callList);

    callList = createCallsForCopies(get(formdata, 'copies.overseas', 0), callList);

    return callList;
}

function createCallsForCopies(copiesRequired, callList) {
    if (copiesRequired > 0) {
        callList.push(formatCopiesData(copiesRequired));
    }
    return callList;
}

function formatCopiesData(copiesRequired) {
    return {
        amount_or_volume: copiesRequired,
        applicant_type: 'all',
        channel: 'default',
        event: 'copies',
        jurisdiction1: 'family',
        jurisdiction2: 'probate registry',
        service: 'probate'
    };
}

function createPromises(callsRequiredList, headers) {
    return callsRequiredList.map(callRequired => feesLookup.get(callRequired, headers));
}

module.exports = FeesCalculator;
