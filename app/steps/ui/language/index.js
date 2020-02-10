'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const featureToggle = require('app/utils/FeatureToggle');

class BilingualGOP extends ValidationStep {

    static getUrl() {
        return '/bilingual-gop';
    }
}

module.exports = BilingualGOP;
