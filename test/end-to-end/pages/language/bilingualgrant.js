'use strict';

const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');

// eslint-disable-next-line no-unused-vars
module.exports = async function(language = 'en') {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;
    await I.checkPageUrl('app/steps/ui/language');
    const locator = {xpath: '//input[@name="bilingual"][@type="radio"][@value="optionNo"]'};
    await I.waitForEnabled(locator, 5);
    await I.seeCheckboxIsChecked(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
