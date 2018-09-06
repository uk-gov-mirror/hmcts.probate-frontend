'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggles = require('app/config').featureToggles;

router.get('/applicant-alias', (req, res, next) => {
    FeatureToggle.getToggle(res, next, 'applicant-phone', featureToggles.main_applicant_alias);
});

router.get('/applicant-alias-reason', (req, res, next) => {
    FeatureToggle.getToggle(res, next, 'applicant-phone', featureToggles.main_applicant_alias);
});

module.exports = router;
