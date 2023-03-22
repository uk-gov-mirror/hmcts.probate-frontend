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
        ctx.checkData = isEmpty(formData.iht) || (formData.iht.method === 'optionOnline' && isEmpty(formData.iht.identifier));
        return ctx;
    }
    next(req, ctx) {
        const journeyMap = new JourneyMap(req.session.journey);
        const formData = req.session.form;
        if (featureToggle.isEnabled(req.session.featureToggles, 'ft_excepted_estates') && ExceptedEstateDod.afterEeDodThreshold(ctx['dod-date']) && ctx.englishForeignDeathCert === 'optionYes') {
            return journeyMap.getNextStepByName('IhtEstateValued');
        } else if (featureToggle.isEnabled(req.session.featureToggles, 'ft_stop_ihtonline') && ctx.checkData) {
            formData.iht = {method: 'optionPaper'};
            return journeyMap.getNextStepByName('IhtPaper');
        }

        return journeyMap.nextStep(this, ctx);
    }

    nextStepOptions(ctx) {
        if (ctx.isStopIHTOnline && (ctx.checkData || ctx.iht.method === 'optionPaper')) {
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
