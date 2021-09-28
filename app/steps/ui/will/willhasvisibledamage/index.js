'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('app/components/error');
const {isEmpty} = require('lodash');

class WillHasVisibleDamage extends ValidationStep {

    static getUrl() {
        return '/will-has-damage';
    }

    nextStepOptions() {
        return {
            options: [
                {
                    key: 'willHasVisibleDamage',
                    value: 'optionYes',
                    choice: 'willDoesHaveVisibleDamage'
                },
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

    handlePost(ctx, errors, formdata, session) {
        if (ctx.willHasVisibleDamage === 'optionYes' && !ctx.willDamageTypes) {
            errors.push(FieldError('willDamageTypes', 'required', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        }
        if (ctx.willHasVisibleDamage === 'optionYes' && ctx.willDamageTypes && ctx.willDamageTypes.includes('otherVisibleDamage') && !ctx.otherDamageDescription) {
            errors.push(FieldError('otherDamageDescription', 'required', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        }

        if (!isEmpty(errors)) {
            return [ctx, errors];
        }

        const willDamage = {};
        willDamage.damageTypesList = ctx.willDamageTypes;
        if (ctx.willDamageTypes && ctx.willDamageTypes.includes('otherVisibleDamage')) {
            willDamage.otherDamageDescription = ctx.otherDamageDescription;
        }
        ctx.willDamage = willDamage;

        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        if (ctx.willHasVisibleDamage === 'optionNo') {
            delete ctx.willDamage;
        }
        delete ctx.options;
        delete ctx.willDamageTypes;
        delete ctx.otherDamageDescription;
        return [ctx, formdata];
    }
}

module.exports = WillHasVisibleDamage;
