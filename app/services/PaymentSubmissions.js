'use strict';

const Service = require('./Service');
const config = require('app/config');
const caseTypes = require('app/utils/CaseTypes');

class PaymentSubmissions extends Service {

    post(logMessage, emailAddress, authorization, serviceAuthorization, hostname, caseType) {
        const probateType = caseTypes.getProbateType(caseType);
        this.log(logMessage);
        const paymentUpdatesCallback = config.services.orchestrator.url + config.services.orchestrator.paths.payment_updates;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization,
            'return-url': this.formatUrl.format(hostname, config.services.payment.paths.returnUrlPath),
            'service-callback-url': paymentUpdatesCallback
        };
        const path = this.replacePlaceholderInPath(this.config.services.orchestrator.paths.payment_submissions, 'emailAddress', emailAddress);
        const url = this.endpoint + path + '?probateType=' + probateType;
        const fetchOptions = this.fetchOptions({}, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    put(logMessage, emailAddress, authorization, serviceAuthorization, caseType) {
        const probateType = caseTypes.getProbateType(caseType);
        this.log(logMessage);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'ServiceAuthorization': serviceAuthorization
        };
        const path = this.replacePlaceholderInPath(this.config.services.orchestrator.paths.payment_submissions, 'emailAddress', emailAddress);
        const url = this.endpoint + path + '?probateType=' + probateType;
        const fetchOptions = this.fetchOptions({}, 'PUT', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = PaymentSubmissions;
