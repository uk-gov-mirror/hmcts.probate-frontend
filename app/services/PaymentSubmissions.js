'use strict';

const Service = require('./Service');
const config = require('app/config');

class PaymentSubmissions extends Service {

    post(logMessage, id, authorization, serviceAuthorization, hostname, caseType) {
        this.log(logMessage);
        const paymentUpdatesCallback = config.services.orchestrator.url + config.services.orchestrator.paths.payment_updates;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization,
            'return-url': this.formatUrl.format(hostname, config.services.payment.paths.returnUrlPath),
            'service-callback-url': paymentUpdatesCallback
        };
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.payment_submissions, id);
        const url = this.endpoint + path + '?probateType=' + caseType;
        const fetchOptions = this.fetchOptions({}, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    put(logMessage, id, authorization, serviceAuthorization, caseType) {
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const path = this.replaceIdInPath(this.config.services.orchestrator.paths.payment_submissions, id);
        const url = this.endpoint + path + '?probateType=' + caseType;
        const fetchOptions = this.fetchOptions({}, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = PaymentSubmissions;
