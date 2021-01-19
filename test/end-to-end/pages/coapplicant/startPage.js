'use strict';

const config = require('config');
const contentEn = require('app/resources/en/translation/coapplicant/startpage');
const contentCy = require('app/resources/cy/translation/coapplicant/startpage');

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.checkPageUrl('app/steps/ui/coapplicant/startpage');
    await I.waitForText(commonContent.subHeader1, config.TestWaitForTextToAppear);
    await I.navByClick('.govuk-button');
};
