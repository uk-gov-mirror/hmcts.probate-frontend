'use strict';

const Service = require('./Service');
const caseTypes = require('app/utils/CaseTypes');

class ValidateData extends Service {

    put(data, authorization, serviceAuthorization, caseType) {
        const probateType = caseTypes.getProbateType(caseType);
        this.log('Post validate data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.validations, data.applicantEmail);
        const url = this.endpoint + path + '?probateType=' + probateType;
        const fetchOptions = this.fetchOptions({}, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = ValidateData;
