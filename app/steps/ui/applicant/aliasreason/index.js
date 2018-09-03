const ValidationStep = require('app/core/steps/ValidationStep');

module.exports = class ApplicantAliasReason extends ValidationStep {

    static getUrl() {
        return '/applicant-alias-reason';
    }
};
