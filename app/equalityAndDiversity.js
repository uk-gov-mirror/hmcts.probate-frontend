'use strict';

const router = require('express').Router();
const completeEqualityTask = require('app/middleware/completeEqualityTask');

router.get('/equality-and-diversity', (req, res, next) => completeEqualityTask(req, res, next));

module.exports = router;
