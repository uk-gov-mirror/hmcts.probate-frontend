'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.get('/start-eligibility', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api_toggle', featureToggle.toggleFeature));
router.get('/copies-uk', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api_toggle', featureToggle.toggleFeature));
router.get('/copies-overseas', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api_toggle', featureToggle.toggleFeature));
router.all('/payment-breakdown', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api_toggle', featureToggle.toggleFeature));

router.all('/task-list', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'pcq_toggle', featureToggle.toggleFeature));

module.exports = router;
