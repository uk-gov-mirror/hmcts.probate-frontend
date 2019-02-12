'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const validator = require('validator');
const numeral = require('numeral');
const FieldError = require('app/components/error');

class ValueAssetsOutside extends ValidationStep {

    static getUrl() {
        return '/value-assets-outside-england-wales';
    }

    handlePost(ctx, errors) {
        ctx.netValueAssetsOutside = numeral(ctx.netValueAssetsOutsideField).value();

        if (!validator.isCurrency(ctx.netValueAssetsOutsideField, {symbol: '£', allow_negatives: false})) {
            errors.push(FieldError('netValueAssetsOutsideField', 'invalidCurrencyFormat', this.resourcePath, this.generateContent()));
        }

        ctx.netValueAssetsOutside = Math.floor(ctx.netValueAssetsOutside);

        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.netValueAssetsOutsideField;
        return [ctx, formdata];
    }
}

module.exports = ValueAssetsOutside;
