'use strict';

const config = require('app/config');
const FeesCalculator = require('app/utils/FeesCalculator');
const ServiceMapper = require('app/utils/ServiceMapper');

const calculatePaymentFees = (req, res, next) => {
    const session = req.session;
    const formdata = session.form;
    const feesCalculator = new FeesCalculator(config.services.feesRegister.url, session.id);
    if (config.services.payment.enableBackend) {
        const feesService = ServiceMapper.map(
            'FeesData',
            [config.services.orchestrator.url, session.id],
            formdata.journeyType
        );

        feesService.updateFees(formdata, req.authToken, req.session.serviceAuthorization)
            .then((form) => {
                session.form = form;
                next();
            });
    } else {
        feesCalculator.calc(formdata, req.authToken)
            .then((fees) => {
                formdata.fees = fees;
                session.form = formdata;
                next();
            });
    }
};

module.exports = calculatePaymentFees;
