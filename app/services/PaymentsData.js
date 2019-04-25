'use strict';

const Service = require('./Service');

class PaymentsData extends Service {

    addPayments(data, authorisation, serviceAuthorization) {
        data.type = this.getFormType();
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.payments, data.applicantEmail);
        const logMessage = 'Post payments data';
        const url = this.endpoint + path;
        return this.post(logMessage, url, data, authorisation, serviceAuthorization);
    }

    post(logMessage, url, bodyData, authorization, serviceAuthorization) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const fetchOptions = this.fetchOptions(bodyData, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getFormType() {
        throw (new Error('Abstract method not implemented.'));
    }
}

module.exports = PaymentsData;
