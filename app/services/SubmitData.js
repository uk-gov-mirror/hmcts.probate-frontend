'use strict';

const Service = require('./Service');

class SubmitData extends Service {

    submit(data, ctx) {
        data["type"] = this.getFormType();
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.submissions, data.applicant.email);
        const logMessage = 'Post submit data';
        const url = this.endpoint + path;
        return this.post(ctx, logMessage, url, data);
    }

    post(ctx, logMessage, url, bodyData) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Session-Id': ctx.sessionID,
            'Authorization': ctx.authToken,
            'ServiceAuthorization': ctx.serviceAuthorization
        };
        const fetchOptions = this.fetchOptions(bodyData, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getFormType() {
        throw( new Error( "Abstract method not implemened." ) );
    }
}

module.exports = SubmitData;
