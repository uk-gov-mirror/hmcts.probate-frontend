'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/deathcertificate');

module.exports = function (answer) {
    const I = this;

    I.waitInUrl(pageUnderTest.getUrl());
    I.waitInUrl(pageUnderTest.getUrl());
    I.click(`#deathCertificate-option${answer}`);

    I.waitForNavigationToComplete(commonContent.continue);
};
