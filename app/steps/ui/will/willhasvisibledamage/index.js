'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class WillHasVisibleDamage extends ValidationStep {

    static getUrl() {
        return '/will-has-damage';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'willHasVisibleDamage', value: 'optionYes', choice: 'willDoesHaveVisibleDamage'},
            ]
        };
    }

    handlePost(ctx, errors) {
        const willDamageSet = {};
        willDamageSet.willDamageTypesList = ctx.willDamageTypes;
        if (ctx.willDamageTypes.includes('otherVisibleDamage')) {
            willDamageSet.otherDamageDescription = ctx.otherDamageDescription;
            delete ctx.otherDamageDescription;
        }
        ctx.willDamageTypes = willDamageSet;
        return [ctx, errors];
    }
}

module.exports = WillHasVisibleDamage;
