'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language = 'en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.checkPageUrl('app/steps/ui/applicant/phone');
    const locator = {css: '#phoneNumber'};
    await I.waitForElement(locator);
    await I.fillField(locator, '123456789');
    await I.navByClick(commonContent.saveAndContinue);
};
