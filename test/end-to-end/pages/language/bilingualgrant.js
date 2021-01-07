'use strict';

const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');
const pageUnderTest = require('app/steps/ui/language');

module.exports = async function(language = 'en', answer) {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.seeInCurrentUrl(pageUnderTest.getUrl());
    const locator = {css: `#bilingual${answer}`};
    await I.waitForElement(locator);
    await I.seeCheckboxIsChecked(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
