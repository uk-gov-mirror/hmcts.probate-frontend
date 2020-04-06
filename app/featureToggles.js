'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();
const LaunchDarkly = require('launchdarkly-node-server-sdk');
const ldClient = LaunchDarkly.init('sdk-4d50eb6e-8400-4aa7-b4c5-8bdfc8b1d844');

ldClient.once('ready', () => {
    router.get('/start-eligibility', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
    router.get('/copies-uk', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
    router.get('/copies-overseas', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
    router.all('/payment-breakdown', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
});

module.exports = router;
