'use strict';
const pageUnderTest = require('app/steps/ui/screeners/startapply');

module.exports = async function() {
    const I = this;
    await I.seeInCurrentUrl(pageUnderTest.getUrl());

    const locator = {css: '.govuk-button'};
    await I.waitForElement(locator);
    await I.navByClick(locator);
};
