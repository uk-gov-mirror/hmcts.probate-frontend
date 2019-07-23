'use strict';

const ValidateData = require('./ValidateData');

class IntestacyValidateData extends ValidateData {

    getFormType() {
        return 'Intestacy';
    }

    getApplicantEmail(data) {
        return data.applicantEmail;
    }
}

module.exports = IntestacyValidateData;
