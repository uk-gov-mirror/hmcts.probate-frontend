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

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (ctx.willDamage) {
            if (ctx.willDamage.damageTypesList) {
                ctx.options = {};
                for (let i = 0; i < ctx.willDamage.damageTypesList.length; i++) {
                    ctx.options[ctx.willDamage.damageTypesList[i]] = true;
                }
                return ctx;
            }
        }
        return ctx;
    }

    handlePost(ctx, errors) {
        const willDamageSet = {};
        willDamageSet.damageTypesList = ctx.willDamageTypes;
        if (ctx.willDamageTypes.includes('otherVisibleDamage')) {
            willDamageSet.otherDamageDescription = ctx.otherDamageDescription;
            delete ctx.otherDamageDescription;
        }
        ctx.willDamage = willDamageSet;
        return [ctx, errors];
    }
}

module.exports = WillHasVisibleDamage;
