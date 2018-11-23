'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.get('/applicant-alias', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.togglePage, 'applicant-phone'));
router.get('/applicant-alias-reason', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.togglePage, 'applicant-phone'));
router.get('/summary/*', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.toggleFeature));
router.get('/tasklist', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.toggleFeature));

router.post('/will-left', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.toggleFeature));
router.get('/died-after-october-2014', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.togglePage, 'start-eligibility'));
router.get('/relationship-to-deceased', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.togglePage, 'start-eligibility'));
router.get('/other-applicants', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'intestacy_screening_questions', featureToggle.togglePage, 'start-eligibility'));

router.get('/executor-current-name/:index', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.toggleFeature));
router.get('/executor-current-name-reason/:index', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.toggleFeature));
router.get('/executor-current-name-reason/:index', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'main_applicant_alias', featureToggle.togglePage, `/executor-current-name/${req.params.index}`));
router.get('/document-upload', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'document_upload', featureToggle.togglePage, '/tasklist'));

module.exports = router;
