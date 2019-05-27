'use strict';

const Service = require('./Service');

class SubmitData extends Service {

    submit(data, paymentDto, authorisation, serviceAuthorization) {
        data.type = this.getFormType();
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.submissions, this.getApplicantEmail(data));
        const logMessage = 'Put submit data';
        const url = this.endpoint + path + '?probateType='+this.getFormType();
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

    getFormType() {
        throw (new Error('Abstract method not implemented.'));
    }

    getApplicantEmail(data) {
        throw (new Error('Abstract method not implemented for:' + data));
    }

    post() {
    }
}

module.exports = SubmitData;
