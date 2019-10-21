'use strict';

const config = require('app/config');
const ValidationStep = require('app/core/steps/ValidationStep');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const Dashboard = require('app/steps/ui/dashboard');

class EligibilityValidationStep extends ValidationStep {

    setFeatureTogglesOnCtx(ctx, featureToggles = {}) {
        Object.keys(featureToggles).forEach((toggle) => {
            ctx[toggle] = featureToggles[toggle];
        });
        return ctx;
    }

    getContextData(req, res, pageUrl, fieldKey, featureToggles) {
        let ctx = super.getContextData(req);

        if (req.method === 'GET') {
            const answerValue = eligibilityCookie.getAnswer(req, pageUrl, fieldKey);
            if (answerValue) {
                ctx[fieldKey] = answerValue;
            }
        } else {
            let nextStepUrl;
            let eligibilityQuestionsList;

            if (Object.keys(config.eligibilityQuestionsProbate).includes(fieldKey)) {
                eligibilityQuestionsList = config.eligibilityQuestionsProbate;
            } else if (Object.keys(config.eligibilityQuestionsIntestacy).includes(fieldKey)) {
                eligibilityQuestionsList = config.eligibilityQuestionsIntestacy;
            }

            if (eligibilityQuestionsList) {
                let allPreviousEligibilityQuestionsAnswered = true;

                for (const itemKey of Object.keys(eligibilityQuestionsList)) {
                    if (itemKey === fieldKey) {
                        break;
                    }

                    if (!req.session.form.screeners || !req.session.form.screeners[itemKey] || req.session.form.screeners[itemKey] !== eligibilityQuestionsList[itemKey]) {
                        allPreviousEligibilityQuestionsAnswered = false;
                    }
                }

                if (!allPreviousEligibilityQuestionsAnswered) {
                    nextStepUrl = Dashboard.getUrl();
                }
            } else {
                nextStepUrl = Dashboard.getUrl();
            }

            if (!nextStepUrl) {
                ctx = this.setFeatureTogglesOnCtx(ctx, featureToggles);
                nextStepUrl = this.nextStepUrl(req, ctx);
                this.setEligibilityCookie(req, res, nextStepUrl, fieldKey, ctx[fieldKey]);
            }
        }

        return ctx;
    }

    handlePost(ctx, errors, formdata) {
        super.handlePost(ctx, formdata);
        return [ctx, errors];
    }

    persistFormData() {
        return {};
    }

    setEligibilityCookie(req, res, nextStepUrl, fieldKey, fieldValue) {
        eligibilityCookie.setCookie(req, res, nextStepUrl, fieldKey, fieldValue);
    }
}

module.exports = EligibilityValidationStep;
