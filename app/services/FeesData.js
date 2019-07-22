'use strict';

const Service = require('./Service');

class Fees extends Service {

    updateFees(data, authorisation, serviceAuthorization, caseType) {
        data.type = this.getFormType();
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.fees, data.applicantEmail);
        const logMessage = 'Update fees';
        const url = this.endpoint + path + '?probateType=' + caseType;
        return this.post(logMessage, url, authorisation, serviceAuthorization);
    }

    post(logMessage, url, authorization, serviceAuthorization) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const fetchOptions = this.fetchOptions({}, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = Fees;
