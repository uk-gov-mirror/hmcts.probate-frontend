'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.post('/will-left', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.toggleFeature));
router.get('/died-after-october-2014', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.togglePage, 'start-eligibility'));
router.get('/relationship-to-deceased', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.togglePage, 'start-eligibility'));
router.get('/other-applicants', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.togglePage, 'start-eligibility'));

router.get('/document-upload', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'document_upload', featureToggle.togglePage, '/tasklist'));
router.get('/deceased-address', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'document_upload', featureToggle.toggleFeature));

module.exports = router;
