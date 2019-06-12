'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/currentname');

module.exports = function (executorNumber, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.waitInUrl(pageUnderTest.getUrl());
    } else {
        I.waitInUrl(pageUnderTest.getUrl(parseInt(executorNumber) - 1));
    }

    I.fillField('#currentName', `Executor${executorNumber} Current Name`);

    I.waitForNavigationToComplete(commonContent.saveAndContinue);
};
