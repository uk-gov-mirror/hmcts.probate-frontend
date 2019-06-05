'use strict';

//const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/deceaseddomicile');

module.exports = function (answer) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click(`#domicile-option${answer}`);

    I.click('Continue');
    //I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
};
