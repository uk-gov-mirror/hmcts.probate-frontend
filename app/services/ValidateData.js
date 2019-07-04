'use strict';

const Service = require('./Service');

class ValidateData extends Service {
    put(data, authorization, serviceAuthorization) {
        this.log('Post validate data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.validations, this.getApplicantEmail(data));
        const url = this.endpoint + path + '?probateType=' + this.getFormType();
        const fetchOptions = this.fetchOptions({}, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getFormType() {
        throw (new Error('Abstract method not implemented.'));
    }

    getApplicantEmail(data) {
        throw (new Error('Abstract method not implemented for:' + data));
    }
}

module.exports = ValidateData;
