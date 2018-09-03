const ValidationStep = require('app/core/steps/ValidationStep');

module.exports = class ApplicantAlias extends ValidationStep {

    static getUrl() {
        return '/applicant-alias';
    }
};
