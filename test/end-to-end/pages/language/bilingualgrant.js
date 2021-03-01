'use strict';

const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');

module.exports = async function(language = 'en', answer) {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.checkPageUrl('app/steps/ui/language');
    const locator = {css: `#bilingual${answer}`};
    await I.waitForEnabled(locator);
    await I.seeCheckboxIsChecked(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
