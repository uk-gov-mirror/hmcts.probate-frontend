'use strict';

const Service = require('./Service');
const caseTypes = require('app/utils/CaseTypes');

class FormData extends Service {
    getAll(authToken, serviceAuthorisation) {
        const path = this.config.services.orchestrator.paths.applications;
        const logMessage = 'Get all applications';
        const url = this.endpoint + path;
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        const fetchOptions = this.fetchOptions({}, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }

    get(authToken, serviceAuthorisation, ccdCaseId, probateType) {
        const path = this.replacePlaceholderInPath(this.config.services.orchestrator.paths.forms, 'ccdCaseId', ccdCaseId);
        const url = this.endpoint + path + '?probateType=' + probateType;
        this.log('Get application form data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        const fetchOptions = this.fetchOptions({}, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }

    post(authToken, serviceAuthorisation, ccdCaseId, data = {}) {
        data.type = data.caseType;
        const path = this.replacePlaceholderInPath(this.config.services.orchestrator.paths.forms, 'ccdCaseId', ccdCaseId);
        const url = this.endpoint + path;
        this.log('Post application form data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    postNew(authToken, serviceAuthorisation, caseType) {
        const probateType = caseTypes.getProbateType(caseType);
        const path = this.config.services.orchestrator.paths.create;
        const url = this.endpoint + path + '?probateType=' + probateType;
        this.log('Post new form data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };

        const fetchOptions = this.fetchOptions({}, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getDeclarationStatuses(authToken, serviceAuthorisation, ccdCaseId) {
        const path = this.replacePlaceholderInPath(this.config.services.orchestrator.paths.declarationStatuses, 'ccdCaseId', ccdCaseId);
        const url = this.endpoint + path + '?probateType=PA';
        this.log('Get declaration statuses');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        const fetchOptions = this.fetchOptions({}, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = FormData;
