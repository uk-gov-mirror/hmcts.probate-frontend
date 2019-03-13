'use strict';

const Service = require('./Service');

class FormData extends Service {

    get(logMessage, url, authToken, serviceAuthorisation) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Session-Id': this.sessionId,
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        const fetchOptions = this.fetchOptions({}, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }

    post(data, logMessage, url, req) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Session-Id': this.sessionId,
            'Authorization': req.authToken,
            'ServiceAuthorization': req.session.serviceAuthorization
        };

        var jsonstr =  JSON.stringify(data);
        console.log(jsonstr);
        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getFormType() {
        throw( new Error( "Abstract method not implemened." ) );
    }
}

module.exports = FormData;
