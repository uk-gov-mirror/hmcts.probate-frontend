'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');
const phoneContentEn = require('app/resources/en/translation/applicant/phone');
const phoneContentCy = require('app/resources/cy/translation/applicant/phone');
const pagePath = require('app/steps/ui/applicant/phone');

module.exports = async function(language = 'en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;
    const phoneContent = language === 'en' ? phoneContentEn : phoneContentCy;

    await I.seeInCurrentUrl(pagePath.getUrl());
    if (language === 'en') {
        await I.waitForText(phoneContent.phoneNumber);
    }
    await I.fillField('#phoneNumber', '123456789');
    await I.navByClick(commonContent.saveAndContinue);
};
