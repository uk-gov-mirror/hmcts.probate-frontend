'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language = 'en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.checkPageUrl('app/steps/ui/payment/breakdown');
    await I.waitForElement({css: 'form[action="/payment-breakdown"]'});
    await I.waitForText(commonContent.saveAndContinue);
    const locator = {css: '.govuk-button'};
    await I.waitForElement(locator);
    await I.navByClick(locator);
};
