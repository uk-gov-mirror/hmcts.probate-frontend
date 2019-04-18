'use strict';

const SubmitData = require('./SubmitData');

class IntestacySubmitData extends SubmitData {

    getFormType() {
        return 'Intestacy';
    }

    getApplicantEmail(data) {
        return data.applicant.email;
    }
}

module.exports = IntestacySubmitData;
