'use strict';

const config = require('config');
const contentEn = require('app/resources/en/translation/executors/invite');
const contentCy = require('app/resources/cy/translation/executors/invite');

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;
    await I.checkPageUrl('app/steps/ui/executors/invite');
    await I.waitForText(commonContent.title, config.TestWaitForTextToAppear, 'h1');
    await I.navByClick(commonContent.sendInvites, '.govuk-button');
};
