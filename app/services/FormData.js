'use strict';

const Service = require('./Service');
const caseTypes = require('app/utils/CaseTypes');

class FormData extends Service {

    get(id, authToken, serviceAuthorisation, caseType) {
        const probateType = caseTypes.getProbateType(caseType);
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.forms, id);
        const logMessage = 'Get probate form data';
        const url = this.endpoint + path + '?probateType=' + probateType;
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        const fetchOptions = this.fetchOptions({}, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }

    post(id, data, authToken, serviceAuthorization, caseType) {
        data.type = caseType;
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.forms, id);
        const logMessage = 'Post probate form data';
        const url = this.endpoint + path;
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorization
        };

        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = FormData;
