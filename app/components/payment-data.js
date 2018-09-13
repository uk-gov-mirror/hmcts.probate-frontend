'use strict';

const config = require('app/config');
const {defaultTo} = require('lodash');
const simpleRandom = require('simple-random');
const SERVICE_ID = config.payment.serviceId;
const SITE_ID = config.payment.siteId;
let APPLICATION_FEE_CODE;
let ADDITIONAL_COPY_FEE_CODE_UK;
let ADDITIONAL_COPY_FEE_CODE_OVERSEAS;

const createCaseReference = (deceasedLastName) => {
    let identifier = defaultTo(deceasedLastName, '');
    identifier = identifier.replace(/[^a-zA-Z]/g, '');
    identifier = identifier.substring(0, 28);
    const suffix = simpleRandom({letters: false, length: 4});
    identifier += suffix;
    return identifier;
};

const createPaymentData = (data) => {
    const version = config.payment.version;
    const versionCopiesOverseas = config.payment.copies.overseas.version;
    const versionCopiesUk = config.payment.copies.uk.version;
    const currency = config.payment.currency;
    const paymentData = {
        amount: data.amount,
        description: 'Probate Fees',
        ccd_case_number: data.ccdCaseId,
        service: SERVICE_ID,
        currency: currency,
        site_id: SITE_ID,
        fees: [createPaymentFees({
            amount: data.applicationFee,
            ccdCaseId: data.ccdCaseId,
            code: APPLICATION_FEE_CODE,
            memoLine: 'Probate Fees',
            reference: data.userId,
            version: version,
            volume: 1
        })]
    };

    if (data.copies.uk.number > 0) {
        paymentData.fees.push(createPaymentFees({
            amount: data.copies.uk.cost,
            ccdCaseId: data.ccdCaseId,
            code: ADDITIONAL_COPY_FEE_CODE_UK,
            memoLine: 'Additional UK copies',
            reference: data.userId,
            version: versionCopiesUk,
            volume: data.copies.uk.number
        }));
    }

    if (data.copies.overseas.number > 0) {
        paymentData.fees.push(createPaymentFees({
            amount: data.copies.overseas.cost,
            ccdCaseId: data.ccdCaseId,
            code: ADDITIONAL_COPY_FEE_CODE_OVERSEAS,
            memoLine: 'Additional overseas copies',
            reference: data.userId,
            version: versionCopiesOverseas,
            volume: data.copies.overseas.number
        }));
    }

    return paymentData;
};

const createPaymentFees = (params) => {
    return {
        calculated_amount: params.amount,
        ccd_case_number: params.ccdCaseId,
        code: params.code,
        memo_line: params.memoLine,
        reference: params.reference,
        version: params.version,
        volume: params.volume
    };
};

module.exports = {
    createPaymentData: createPaymentData,
    createCaseReference: createCaseReference,
    createPaymentFees: createPaymentFees
};
