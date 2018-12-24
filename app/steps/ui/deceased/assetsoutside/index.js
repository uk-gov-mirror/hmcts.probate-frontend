'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/deceased/assetsoutside');

class AssetsOutside extends ValidationStep {

    static getUrl() {
        return '/assets-outside-england-wales';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'assetsOutside', value: content.optionYes, choice: 'hasAssetsOutside'}
            ]
        };
    }
}

module.exports = AssetsOutside;
