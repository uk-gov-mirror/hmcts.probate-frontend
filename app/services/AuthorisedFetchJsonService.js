'use strict';

const Service = require('./Service');
const Authorise = require('./Authorise');

class AuthorisedFetchJsonService extends Service {
    post(body, url, req) {
        const authorise = new Authorise(this.config.services.idam.s2s_url, this.sessionId);
        const headers = this.constructHeaders(req);
        return authorise
            .post()
            .then(serviceToken => {
                headers.ServiceAuthorization = serviceToken;
                const fetchOptions = this.fetchOptions(body, 'POST', headers);
                return this.fetchJson(url, fetchOptions);
            })
            .catch(err => {
                this.log(`AuthorisedFetchJsonService error: ${this.formatErrorMessage(err)}`, 'error');
                throw new Error(err);
            });
    }

    constructHeaders(req) {
        return {
            'Content-Type': 'application/json',
            'Session-Id': req.sessionID,
            'Authorization': req.authToken,
        };
    }
}

module.exports = AuthorisedFetchJsonService;
