'use strict';

const config = require('config');
const contentEn = require('app/resources/en/translation/copies/summary');
const contentCy = require('app/resources/cy/translation/copies/summary');
const pagePath = require('app/steps/ui/copies/summary');

module.exports = async function(language ='en') {
    const I = this;
    const summaryContent = language === 'en' ? contentEn : contentCy;
    await I.seeInCurrentUrl(pagePath.getUrl());
    await I.waitForText(summaryContent.extraCopies, config.TestWaitForTextToAppear);

    const locator = {css: '.govuk-button'};
    await I.waitForElement(locator);
    await I.navByClick(locator);
};
