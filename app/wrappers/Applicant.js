'use strict';

class Applicant {
    constructor(formdata) {
        this.formdata = formdata || {};
    }

    applicantHasDeclared() {
        return this.formdata.declaration && this.formdata.declaration.declarationCheckbox === 'true';
    }
}

module.exports = Applicant;
