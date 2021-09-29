'use.strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('app/components/error');
const {isEmpty} = require('lodash');

class WillDamageCulpritKnown extends ValidationStep {

    static getUrl() {
        return '/will-damage-who';
    }

    handlePost(ctx, errors, formdata, session) {
        if (ctx.willDamageCulpritKnown === 'optionYes') {
            if (!ctx.firstName) {
                errors.push(FieldError('firstName', 'required', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
            }
            if (!ctx.lastName) {
                errors.push(FieldError('lastName', 'required', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
            }
        }

        if (!isEmpty(errors)) {
            return [ctx, errors];
        }

        if (ctx.willDamageCulpritKnown === 'optionYes' && ctx.firstName && ctx.lastName) {
            ctx.willDamageCulpritName = {'firstName': ctx.firstName, 'lastName': ctx.lastName};
        }

        return [ctx, errors];
    }

}

module.exports = WillDamageCulpritKnown;
