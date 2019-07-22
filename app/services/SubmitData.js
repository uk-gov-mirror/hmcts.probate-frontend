'use strict';

const Service = require('./Service');

class SubmitData extends Service {
    submit(data, paymentDto, authorisation, serviceAuthorization, caseType) {
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.submissions, data.applicantEmail);
        const logMessage = 'Put submit data';
        const url = this.endpoint + path + '?probateType=' + caseType;
        return this.put(logMessage, url, paymentDto, authorisation, serviceAuthorization);
    }

    put(logMessage, url, paymentDto, authorization, serviceAuthorization) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const fetchOptions = this.fetchOptions(paymentDto, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = SubmitData;
