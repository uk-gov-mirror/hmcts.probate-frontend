'use strict';

const utils = require('app/components/api-utils');
const config = require('app/config');
const BUSINESS_DOCUMENT_URL = config.services.businessDocument.url;
const logger = require('app/components/logger');
const logInfo = (message, sessionId = 'Init') => logger(sessionId).info(message);

const createCheckAnswersPdf = (data, sessionId) => {
    logInfo('Create check your answers PDF', sessionId);
    const headers = {
        'Content-Type': 'application/json',
        'ServiceAuthorization': data.serviceAuthToken
    };
    const body = {
        checkAnswersSummary: data.checkAnswersSummary
    };

    const fetchOptions = utils.fetchOptions(body, 'POST', headers);
    return utils.fetchBuffer(`${BUSINESS_DOCUMENT_URL}/generateCheckAnswersSummaryPDF`, fetchOptions);
};

const createDeclarationPdf = (data, sessionId) => {
    logInfo('Create legal declaration PDF', sessionId);
    const headers = {
        'Content-Type': 'application/json',
        'ServiceAuthorization': data.serviceAuthToken
    };
    const body = {
        legalDeclaration: data.legalDeclaration
    };

    const fetchOptions = utils.fetchOptions(body, 'POST', headers);
    return utils.fetchBuffer(`${BUSINESS_DOCUMENT_URL}/generateLegalDeclarationPDF`, fetchOptions);
};

module.exports = {
    createCheckAnswersPdf,
    createDeclarationPdf
};
