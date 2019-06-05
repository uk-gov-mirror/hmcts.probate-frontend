'use strict';

//const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/willoriginal');

module.exports = function (answer) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click(`#original-option${answer}`);

    I.click('Continue');
    //I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
};
