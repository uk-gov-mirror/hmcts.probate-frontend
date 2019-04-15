'use strict';

const PaymentsData = require('./PaymentsData');

class ProbatePaymentsData extends PaymentsData {

    addPayments(data, authorisation, serviceAuthorization) {
        return super.addPayments(data, authorisation, serviceAuthorization);
    }
}

module.exports = ProbatePaymentsData;
