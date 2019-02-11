'use strict';

const config = require('app/config');
const PaymentBreakDownMapper = require('app/utils/PaymentsBreakDownMapper');

const calculatePaymentBreakDownFees = (req, res, next) => {
    const session = req.session;
    const formdata = session.form;
    const paymentBreakDownMapper = new PaymentBreakDownMapper(config.services.feesRegister.url, session.id);
    paymentBreakDownMapper.calculateBreakDownCost(formdata, req.authToken)
        .then(fees => {
            formdata.fees = fees;
            session.form = formdata;
            next();
        });
};

module.exports = calculatePaymentBreakDownFees;
