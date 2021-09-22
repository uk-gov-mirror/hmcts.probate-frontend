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
        console.log('HANDLING POST');
        console.log(ctx);
        const willDamageSet = {};
        for (let i = 0; i < ctx.willDamage.length; i++) {
            console.log(ctx.willDamage[i]);
            willDamageSet[ctx.willDamage[i]] = 'optionYes';
        }
        if (ctx.willDamage.includes('otherVisibleDamage')) {
            console.log(ctx.willDamageDescription);
            willDamageSet.willDamageDescription = ctx.willDamageDescription;
            delete ctx.willDamageDescription;
        }
        ctx.willDamage = willDamageSet;
        console.log(ctx.willDamage);
        console.log(ctx);
        return [ctx, errors];
    }
}

module.exports = WillHasVisibleDamage;
