'use strict';

const crypto = require('crypto');
const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantName extends ValidationStep {

    static getUrl() {
        return '/applicant-name';
    }

    generateContent(ctx, formdata, language = 'en') {
        const superContent = super.generateContent(ctx, formdata, language);

        const dynamic = crypto.randomInt(100).toString()
            .padStart(2, '0');
        superContent.answerFirstName = superContent.answerFirstName + ' dynamic=' + dynamic;
        superContent.changeFirstName = superContent.changeFirstName + ' dynamic=' + dynamic;
        return superContent;
    }
}

module.exports = ApplicantName;
