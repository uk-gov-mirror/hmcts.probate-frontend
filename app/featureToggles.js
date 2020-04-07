'use strict';

const config = require('config');
const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();
const LaunchDarkly = require('launchdarkly-node-server-sdk');
const ldClient = LaunchDarkly.init(config.featureToggles.launchDarklyKey);

ldClient.once('ready', () => {
    router.get('/start-eligibility', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
    router.get('/copies-uk', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
    router.get('/copies-overseas', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
    router.all('/payment-breakdown', (req, res, next) => featureToggle.callCheckToggle(req, res, next, ldClient, 'ft_fees_api', featureToggle.toggleFeature));
});

module.exports = router;
