'use strict';

const Service = require('./Service');

class SubmitData extends Service {

    submit(data, authorisation, serviceAuthorization) {
        data.type = this.getFormType();
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.submissions, data.applicantEmail);
        const logMessage = 'Post submit data';
        const url = this.endpoint + path;
        return this.put(logMessage, url, data, authorisation, serviceAuthorization);
    }

    put(logMessage, url, bodyData, authorization, serviceAuthorization) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        console.log("Submit body " + JSON.stringify(bodyData))
        const fetchOptions = this.fetchOptions(bodyData, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getFormType() {
        throw (new Error('Abstract method not implemened.'));
    }
}

module.exports = SubmitData;
