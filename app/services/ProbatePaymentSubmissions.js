'use strict';

const PaymentSubmissions = require('./PaymentSubmissions');

class ProbatePaymentSubmissions extends PaymentSubmissions {

    post(logMessage, id, authorization, serviceAuthorization, hostname) {
        return super.post(logMessage, id, authorization, serviceAuthorization, hostname);
    }

    put(logMessage, id, authorization, serviceAuthorization) {
        return  super.put(logMessage, id, authorization, serviceAuthorization);
    }

    getFormType() {
        return 'PA';
    }
}

module.exports = ProbatePaymentSubmissions;
