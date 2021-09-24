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
        if (ctx.willDamageTypes) {
            if (ctx.willDamageTypes.damageTypesList) {
                ctx.options = {};
                for (let i = 0; i < ctx.willDamageTypes.damageTypesList.length; i++) {
                    ctx.options[ctx.willDamageTypes.damageTypesList[i]] = true;
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
        ctx.willDamageTypes = willDamageSet;
        return [ctx, errors];
    }
}

module.exports = WillHasVisibleDamage;
