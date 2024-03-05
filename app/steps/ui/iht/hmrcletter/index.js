'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class HmrcLetter extends ValidationStep {

    static getUrl() {
        return '/hmrc-letter';
    }
    nextStepOptions() {
        return {
            options: [
                {key: 'hmrcLetterId', value: 'optionYes', choice: 'hmrcLetter'}
            ]
        };
    }

    isComplete(ctx) {
        return [
            ctx.hmrcLetter==='optionNo', 'inProgress'
        ];
    }
}

module.exports = HmrcLetter;
