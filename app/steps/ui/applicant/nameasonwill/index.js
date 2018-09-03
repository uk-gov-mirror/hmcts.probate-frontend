'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {get} = require('lodash');
const WillWrapper = require('app/wrappers/Will');
const json = require('app/resources/en/translation/executors/applying.json');

class ApplicantNameAsOnWill extends ValidationStep {

    static getUrl() {
        return '/applicant-name-as-on-will';
    }

    isSoftStop (formdata, ctx) {
        return {
            'stepName': this.constructor.name,
            'isSoftStop': get(formdata, 'applicant.nameAsOnTheWill') === this.generateContent(ctx, formdata).optionNo
        };
    }

    handleGet(ctx, formdata) {
        ctx.codicilPresent = (new WillWrapper(formdata.will)).hasCodicils();
        return [ctx];
    }

    nextStepOptions() {
        const nextStepOptions = {
            options: [
                {key: 'nameAsOnTheWill', value: json.optionNo, choice: 'hasAlias'}
            ]
        };
        return nextStepOptions;
    }
}

module.exports = ApplicantNameAsOnWill;
