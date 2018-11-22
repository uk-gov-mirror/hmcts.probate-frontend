'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/screeners/relationshiptodeceased');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();

class RelationshipToDeceased extends ValidationStep {

    static getUrl() {
        return '/relationship-to-deceased';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('notRelated');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'related', value: content.optionYes, choice: 'related'}
            ]
        };
    }

    setEligibilityCookie(req, res, ctx) {
        eligibilityCookie.setCookie(req, res, this.nextStepUrl(ctx));
    }
}

module.exports = RelationshipToDeceased;
