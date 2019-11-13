'use strict';

class Payment {
    constructor(payment) {
        this.payment = payment || {};
    }

    paymentIsSuccessful() {
        return this.payment.status === 'Success';
    }

    paymentIsNotRequired() {
        return this.payment.status === 'not_required';
    }

    paymentTotalIsZero() {
        return this.payment.status === 0;
    }
}

module.exports = Payment;
