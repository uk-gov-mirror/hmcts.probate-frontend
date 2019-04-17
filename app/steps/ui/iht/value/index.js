'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const validator = require('validator');
const numeral = require('numeral');
const FieldError = require('app/components/error');
const config = require('app/config');

class IhtValue extends ValidationStep {

    static getUrl() {
        return '/iht-value';
    }

    handlePost(ctx, errors) {
        ctx.grossValue = parseFloat(numeral(ctx.grossValueOnline).format('0[.]00'));
        ctx.netValue = parseFloat(numeral(ctx.netValueOnline).format('0[.]00'));

        if (!validator.isCurrency(ctx.grossValueOnline, {symbol: '£', allow_negatives: false})) {
            errors.push(FieldError('grossValueOnline', 'invalidCurrencyFormat', this.resourcePath, this.generateContent()));
        }

        if (!validator.isCurrency(ctx.netValueOnline, {symbol: '£', allow_negatives: false})) {
            errors.push(FieldError('netValueOnline', 'invalidCurrencyFormat', this.resourcePath, this.generateContent()));
        }

        if (ctx.netValue > ctx.grossValue) {
            errors.push(FieldError('netValueOnline', 'netValueGreaterThanGross', this.resourcePath, this.generateContent()));
        }

        return [ctx, errors];
    }

    nextStepOptions(ctx) {
        ctx.lessThanOrEqualTo250k = ctx.netValue <= config.assetsValueThreshold;

        return {
            options: [
                {key: 'lessThanOrEqualTo250k', value: true, choice: 'lessThanOrEqualTo250k'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.lessThanOrEqualTo250k;
        return [ctx, formdata];
    }
}

module.exports = IhtValue;
