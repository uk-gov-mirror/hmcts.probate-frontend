'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/whendied');

module.exports = function (executorNumber, diedBefore, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.waitInUrl(pageUnderTest.getUrl());
    } else {
        I.waitInUrl(pageUnderTest.getUrl(parseInt(executorNumber) - 1));
    }

    if (diedBefore) {
        I.click('#diedbefore-optionYes');
    } else {
        I.click('#diedbefore-optionNo');
    }

    I.waitForNavigationToComplete(commonContent.saveAndContinue);
};
