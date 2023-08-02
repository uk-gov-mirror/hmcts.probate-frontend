'use strict';

const DateStep = require('app/core/steps/DateStep');
const FieldError = require('app/components/error');
const DeceasedName = require('app/steps/ui/deceased/name');

class DeceasedDob extends DateStep {

    static getUrl() {
        return '/deceased-dob';
    }

    static getPreviousUrl() {
        return DeceasedName.getUrl();
    }

    dateName() {
        return ['dob'];
    }

    handlePost(ctx, errors, formdata, session) {
        let dod;
        if (session.form.deceased && session.form.deceased['dod-year'] && session.form.deceased['dod-month'] && session.form.deceased['dod-day']) {
            dod = new Date(`${session.form.deceased['dod-year']}-${session.form.deceased['dod-month']}-${session.form.deceased['dod-day']}`);
            dod.setHours(0, 0, 0, 0);
        }

        const dob = new Date(`${ctx['dob-year']}-${ctx['dob-month']}-${ctx['dob-day']}`);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dob >= today) {
            errors.push(FieldError('dob-date', 'dateInFuture', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        } else if (dob > dod) {
            errors.push(FieldError('dob-date', 'dodBeforeDob', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
        }

        return [ctx, errors];
    }
}

module.exports = DeceasedDob;
