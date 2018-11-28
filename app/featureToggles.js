'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.get('/document-upload', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'document_upload', featureToggle.togglePage, '/tasklist'));

module.exports = router;
