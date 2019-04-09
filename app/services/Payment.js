'use strict';

const Service = require('./Service');
const paymentData = require('app/components/payment-data');
const config = require('app/config');

class Payment extends Service {
    get(data) {
        this.log('Get payment');
        const url = `${this.endpoint}/${data.paymentId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': data.authToken,
            'ServiceAuthorization': data.serviceAuthToken
        };
        const fetchOptions = this.fetchOptions(data, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }

    getCasePayments(data) {
        this.log(`Getting all payments from case` );
        const url = `${this.endpoint}?service_name=Probate&ccd_case_number=${data.caseId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': data.authToken,
            'ServiceAuthorization': data.serviceAuthToken
        };
        const fetchOptions = this.fetchOptions(data, 'GET', headers);
        return this.fetchJson(url, fetchOptions);
    }

    post(data, hostname) {
        this.log('Post payment');
        const url = this.endpoint;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': data.authToken,
            'ServiceAuthorization': data.serviceAuthToken,
            'return-url': this.formatUrl.format(hostname, config.services.payment.paths.returnUrlPath)
        };
        const body = paymentData.createPaymentData(data);
        const fetchOptions = this.fetchOptions(body, 'POST', headers);
        return [this.fetchJson(url, fetchOptions), body.reference];
    }

    processCasePaymentsResponse(casePayments, paymentReference) {
        for (const payment of casePayments.payments) {
            if (payment.status === 'Success') {
                this.log(`Found successful payment: ${payment.payment_reference}`);
                return payment;
            }
        }
        for (const payment of casePayments.payments) {
            if (payment.status === 'Initiated') {
                this.log(`Payment still in progress (Initiated): ${payment.payment_reference}`);
                return payment;
            }
        }
        for (const payment of casePayments.payments) {
            if (payment.payment_reference === paymentReference) {
                this.log(`Payment found: ${payment.payment_reference}`);
                return payment;
            }
        }
        this.log('No payment found for case.');
    }
}

module.exports = Payment;
