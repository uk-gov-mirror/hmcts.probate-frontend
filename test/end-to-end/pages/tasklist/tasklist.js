'use strict';

const contentEn = require('app/resources/en/translation/tasklist');
const contentCy = require('app/resources/cy/translation/tasklist');
const testConfig = require('config');
const pageUnderTest = require('app/steps/ui/tasklist');

module.exports = async function (language ='en') {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.seeInCurrentUrl(pageUnderTest.getUrl());
    await I.waitForText(commonContent.introduction, testConfig.TestWaitForTextToAppear);
    const locator = {css: '.govuk-button'};
    await I.waitForElement(locator);
    await I.click(locator);
};
