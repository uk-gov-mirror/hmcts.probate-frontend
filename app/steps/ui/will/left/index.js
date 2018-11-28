'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/will/left');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();

class WillLeft extends ValidationStep {

    static getUrl() {
        return '/will-left';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('noWill');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'left', value: content.optionYes, choice: 'withWill'}
            ]
        };
    }

    persistFormData() {
        return {};
    }

    setEligibilityCookie(req, res, nextStepUrl) {
        eligibilityCookie.setCookie(req, res, nextStepUrl);
    }
}

module.exports = WillLeft;
