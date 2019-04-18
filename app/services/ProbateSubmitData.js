'use strict';

const SubmitData = require('./SubmitData');

class ProbateSubmitData extends SubmitData {
    getFormType() {
        return 'PA';
    }

    getApplicantEmail(data) {
        return data.applicantEmail;
    }
}

module.exports = ProbateSubmitData;
