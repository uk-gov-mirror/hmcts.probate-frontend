'use strict';

const Step = require('app/core/steps/Step');
const featureToggle = require('app/utils/FeatureToggle');

class CopiesStart extends Step {

    static getUrl() {
        return '/copies-start';
    }
}

module.exports = CopiesStart;
