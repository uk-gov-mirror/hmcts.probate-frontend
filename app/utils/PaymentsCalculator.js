'use strict';

const get = require('lodash').get();
const PaymentFeesLookup = require('app/services/PaymentFeesLookup');
let paymentsFeesLookup;
const issuesdata = {
    amount_or_volume: 0,
    applicant_type: 'personal',
    channel: 'default',
    event: 'issue',
    jurisdiction1: 'family',
    jurisdiction2: 'probate registry',
    service: 'probate'
};

class PaymentsCalculator {

    constructor(endpoint, sessionId) {
        this.endpoint = endpoint;
        this.sessionId = sessionId;
        paymentsFeesLookup = new PaymentFeesLookup(this.endpoint, sessionId);
    }

    createCallsRequired(formdata) {
        let callList = [];
        issuesdata.amount_or_volume = get(formdata, 'iht.netValue', 0);
        callList.push(issuesdata);

        callList = this.createCopyCalls(get(formdata, 'copies.uk', 0), callList);

        callList = this.createCopyCalls(get(formdata, 'copies.overseas', 0), callList);

        return callList;
    }

    createCopyCalls(copiesRequired, callList) {
        if (copiesRequired > 0) {
            callList.push(this.formatCopiesData(copiesRequired));
        }
        return callList;
    }

    formatCopiesData(copiesRequired) {
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

    createPromises(callsRequiredList, headers) {
        return callsRequiredList.map(callRequired => paymentsFeesLookup.get(callRequired, headers));
    }

    calc(formdata, authToken) {
        const headers = {
            authToken: authToken
        };

        const calls = this.createCallsRequired(formdata);
        const promises = this.createPromises(calls, headers);
        return Promise.all(promises);
    }

}

module.exports = PaymentsCalculator;
