'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/deathcertificate');

module.exports = function (answer) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click(`#deathCertificate-option${answer}`);

    //I.click(commonContent.continue);
    //I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
    I.waitForNavigationToComplete(commonContent.continue);
};
