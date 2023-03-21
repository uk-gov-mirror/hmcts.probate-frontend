'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const JourneyMap = require('app/core/JourneyMap');
const featureToggle = require('app/utils/FeatureToggle');
const ExceptedEstateDod = require('app/utils/ExceptedEstateDod');
const {isEmpty} = require('lodash');
const FeatureToggle = require('../../../../utils/FeatureToggle');
const pageUrl = '/english-foreign-death-cert';

class EnglishForeignDeathCert extends ValidationStep {

    static getUrl() {
        return pageUrl;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.isStopIHTOnline = FeatureToggle.isEnabled(req.session.featureToggles, 'ft_stop_ihtonline');
        const formData = req.session.form;
        ctx.iht = formData.iht;
        return ctx;
    }
    next(req, ctx) {
        const journeyMap = new JourneyMap(req.session.journey);
        if (featureToggle.isEnabled(req.session.featureToggles, 'ft_excepted_estates') && ExceptedEstateDod.afterEeDodThreshold(ctx['dod-date']) && ctx.englishForeignDeathCert === 'optionYes') {
            return journeyMap.getNextStepByName('IhtEstateValued');
        }

        return journeyMap.nextStep(this, ctx);
    }

    nextStepOptions(ctx) {
        if (ctx.isStopIHTOnline &&
            (isEmpty(ctx.iht) || (ctx.iht.method === 'optionOnline' && isEmpty(ctx.iht.identifier)))) {
            return {
                options: [
                    {key: 'englishForeignDeathCert', value: 'optionYes', choice: 'ihtPaper'}
                ]
            };
        }
        return {
            options: [
                {key: 'englishForeignDeathCert', value: 'optionYes', choice: 'foreignDeathCertIsInEnglish'}
            ]
        };
    }
}

module.exports = EnglishForeignDeathCert;
