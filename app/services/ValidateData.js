'use strict';

const Service = require('./Service');

class ValidateData extends Service {

    put(data, authorization, serviceAuthorization, caseType) {
        this.log('Post validate data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.validations, data.applicantEmail);
        const url = this.endpoint + path + '?probateType=' + caseType;
        const fetchOptions = this.fetchOptions({}, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = ValidateData;
