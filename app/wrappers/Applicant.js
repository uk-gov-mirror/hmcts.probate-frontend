'use strict';

const util = require('util');

const isEmpty = require('lodash').isEmpty;

class Applicant {
    constructor(formdata) {
        this.formdata = formdata || {};
    }

    applicantHasDeclared() {
        console.log(util.inspect(this.formdata, {showHidden: false, depth: null}));
        return !isEmpty(this.formdata.declaration) && this.formdata.declaration.declarationCheckbox === 'true';
    }
}

module.exports = Applicant;
