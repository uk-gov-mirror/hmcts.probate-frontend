'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/screeners/diedafteroctober2014');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();

class DiedAfterOctober2014 extends ValidationStep {

    static getUrl() {
        return '/died-after-october-2014';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('notDiedAfterOctober2014');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'diedAfter', value: content.optionYes, choice: 'diedAfter'}
            ]
        };
    }

    setEligibilityCookie(req, res, nextStepUrl) {
        eligibilityCookie.setCookie(req, res, nextStepUrl);
    }
}

module.exports = DiedAfterOctober2014;
