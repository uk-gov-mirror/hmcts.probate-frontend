'use strict';

const ValidateData = require('./ValidateData');

class ProbateValidateData extends ValidateData {

    getFormType() {
        return 'PA';
    }

    getApplicantEmail(data) {
        return data.applicantEmail;
    }
}

module.exports = ProbateValidateData;
