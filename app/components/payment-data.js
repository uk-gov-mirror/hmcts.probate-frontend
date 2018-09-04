'use strict';

const config = require('app/config');
const {get, defaultTo} = require('lodash');
const simpleRandom = require('simple-random');
const logger = require('app/components/logger')('Init');
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

const createPaymentReference = (data, getCaseReference) => {
    const ID_DELIMITER = '$$$';
    const FEE_DELIMITER = '$';
    APPLICATION_FEE_CODE = config.payment.applicationFeeCode;
    ADDITIONAL_COPY_FEE_CODE_UK = config.payment.copies.uk.code;
    ADDITIONAL_COPY_FEE_CODE_OVERSEAS = config.payment.copies.overseas.code;
    const ADDITIONAL_COPY_FEE_DELIMITER = '/';
    let reference = SERVICE_ID + ID_DELIMITER + getCaseReference(data.deceasedLastName) + ID_DELIMITER + SITE_ID + ID_DELIMITER;
    const numberOfUkCopies = get(data, 'copies.uk.number', 0);
    const numberOfOverseasCopies = get(data, 'copies.overseas.number', 0);

    if (data.applicationFee === config.payment.applicationFee) {
        reference += APPLICATION_FEE_CODE;
        if (numberOfUkCopies > 0 || numberOfOverseasCopies > 0) {
           reference += FEE_DELIMITER;
        }
    }

    if (numberOfUkCopies > 0) {
        reference = reference + ADDITIONAL_COPY_FEE_CODE_UK + ADDITIONAL_COPY_FEE_DELIMITER + numberOfUkCopies;
        if (numberOfOverseasCopies > 0) {
            reference += FEE_DELIMITER;
        }
    }

    if (numberOfOverseasCopies > 0) {
        reference = reference + ADDITIONAL_COPY_FEE_CODE_OVERSEAS + ADDITIONAL_COPY_FEE_DELIMITER + numberOfOverseasCopies;
    }

    logger.info(`Payment reference: ${reference}`);
    return reference;
};

const createPaymentData = (data, getCaseReference = createCaseReference) => {
    const version = config.payment.version;
    const versionCopiesOverseas = config.payment.copies.overseas.version;
    const versionCopiesUk = config.payment.copies.uk.version;
    const currency = config.payment.currency;
    const paymentData = {
        amount: data.amount,
        description: 'Probate Fees',
        ccd_case_number: data.ccdCaseId,
        case_reference: createPaymentReference(data, getCaseReference),
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
