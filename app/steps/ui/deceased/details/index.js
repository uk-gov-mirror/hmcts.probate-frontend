'use strict';

const DateStep = require('app/core/steps/DateStep');
const FieldError = require('app/components/error');

class DeceasedDetails extends DateStep {

    static getUrl() {
        return '/deceased-details';
    }

    dateName() {
        return ['dob', 'dod'];
    }

    handlePost(ctx, errors, formdata, session) {
        const dob = new Date(`${ctx['dob-year']}-${ctx['dob-month']}-${ctx['dob-day']}`);
        const dod = new Date(`${ctx['dod-year']}-${ctx['dod-month']}-${ctx['dod-day']}`);
        const today = new Date();

        dob.setHours(0, 0, 0, 0);
        dod.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (dob >= today) {
            errors.push(FieldError('dob-date', 'dateInFuture', this.resourcePath, this.generateContent(), session.language));
        } else if (dob >= dod) {
            errors.push(FieldError('dob-date', 'dodBeforeDob', this.resourcePath, this.generateContent(), session.language));
        }

        if (dod > today) {
            errors.push(FieldError('dod-date', 'dateInFuture', this.resourcePath, this.generateContent(), session.language));
        }

        return [ctx, errors];
    }
}

module.exports = DeceasedDetails;
