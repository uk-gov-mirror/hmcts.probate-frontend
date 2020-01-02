'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.get('/start-eligibility', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api', featureToggle.toggleFeature));
router.get('/copies-uk', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api', featureToggle.toggleFeature));
router.get('/copies-overseas', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api', featureToggle.toggleFeature));
router.all('/payment-breakdown', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'fees_api', featureToggle.toggleFeature));

router.get('/bilingual-gop', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'welsh_ft', featureToggle.togglePage, {gop: '/deceased-name', intestacy: '/deceased-details'}));
router.all('*', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'welsh_ft', featureToggle.toggleFeature));

module.exports = router;
