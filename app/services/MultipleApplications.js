'use strict';

const Service = require('./Service');

class MultipleApplications extends Service {
    // createNewApplication(authToken, serviceAuthToken, email) {
    //     this.log('Create new application');
    //
    //     const url = this.formatUrl.format(`${this.endpoint}?email=${email}`);
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Session-Id': this.sessionId,
    //         'Authorization': authToken,
    //         'ServiceAuthorization': serviceAuthToken
    //     };
    //     const fetchOptions = this.fetchOptions({}, 'POST', headers);
    //
    //     return this.fetchJson(url, fetchOptions);
    // }

    // getApplications(authToken, serviceAuthToken, email) {
    //     this.log('Get all applications');
    //     const url = this.formatUrl.format(`${this.endpoint}?email=${email}`);
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Session-Id': this.sessionId,
    //         'Authorization': authToken,
    //         'ServiceAuthorization': serviceAuthToken
    //     };
    //     const fetchOptions = this.fetchOptions({}, 'GET', headers);
    //
    //     return this.fetchJson(url, fetchOptions);
    // }

    // getCase(authToken, serviceAuthToken, email, ccsCaseId) {
    //     this.log('Get single application');
    //     const url = this.formatUrl.format(`${this.endpoint}?email=${email}&ccdCaseId=${ccsCaseId}`);
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Session-Id': this.sessionId,
    //         'Authorization': authToken,
    //         'ServiceAuthorization': serviceAuthToken
    //     };
    //     const fetchOptions = this.fetchOptions({}, 'GET', headers);
    //
    //     return this.fetchJson(url, fetchOptions);
    // }
}

module.exports = MultipleApplications;
