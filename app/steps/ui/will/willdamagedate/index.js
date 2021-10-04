'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('app/components/error');
const moment = require('moment');
const config = require('config');

class WillDamageDate extends ValidationStep {

    static getUrl() {
        return '/will-damage-date';
    }

    handleGet(ctx) {
        if (ctx.willDamageDate) {
            [ctx['willdamagedate-day'], ctx['willdamagedate-month'], ctx['willdamagedate-year']] = ctx.willDamageDate.split('/');

        }
        return [ctx];
    }

    handlePost(ctx, errors, formdata, session) {

        if (ctx.willDamageDateKnown === 'optionNo') {
            delete ctx['willdamagedate-day'];
            delete ctx['willdamagedate-month'];
            delete ctx['willdamagedate-year'];
            ctx.willDamageDate = '';
            return [ctx, errors];
        }

        const day = ctx['willdamagedate-day'] ? ctx['willdamagedate-day'] : '1';
        const month = ctx['willdamagedate-month'] ? ctx['willdamagedate-month'] : '1';
        const year = ctx['willdamagedate-year'];

        const willdamagedate = moment(`${day}/${month}/${year}`, config.dateFormat).parseZone();

        if (!year || isNaN(year)) {
            errors.push(FieldError('willdamagedate-year', 'required', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        } else if (willdamagedate.isAfter(moment())) {
            errors.push(FieldError('willdamagedate', 'future', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        } else if (!willdamagedate.isValid()) {
            errors.push(FieldError('willdamagedate', 'invalid', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        }

        const d = ctx['willdamagedate-day'] ? ctx['willdamagedate-day'] : '';
        const m = ctx['willdamagedate-month'] ? ctx['willdamagedate-month'] : '';
        const y = ctx['willdamagedate-year'];
        const formattedDate = `${d}/${m}/${y}`;
        ctx.willDamageDate = formattedDate;

        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        if (ctx.willDamageDateKnown === 'optionNo') {
            ctx.willDamageDate = '';
        }
        delete ctx['willdamagedate-day'];
        delete ctx['willdamagedate-month'];
        delete ctx['willdamagedate-year'];
        return [ctx, formdata];
    }
}

module.exports = WillDamageDate;
