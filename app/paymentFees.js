'use strict';

const router = require('express').Router();
const paymentFeesBreakDown = require('app/middleware/paymentFeesBreakDown');

router.get('/payment-breakdown', (req, res, next) => paymentFeesBreakDown(req, res, next));

module.exports = router;
