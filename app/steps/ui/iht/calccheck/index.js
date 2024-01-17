'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class CalcCheck extends ValidationStep {

    static getUrl() {
        return '/calc-check';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'calcCheckCompleted', value: 'optionYes', choice: 'calcCheckCompleted'},
                {key: 'calcCheckCompleted', value: 'optionNo', choice: 'calcCheckIncomplete'}
            ]
        };
    }

    isComplete(ctx) {
        return [
            ctx.estateValueCompleted==='optionYes' || ctx.estateValueCompleted==='optionNo', 'inProgress'
        ];
    }
}

module.exports = CalcCheck;
