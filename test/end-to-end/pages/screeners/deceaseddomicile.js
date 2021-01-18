'use strict';

const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');
const deceasedDomicileEn = require('app/resources/en/translation/screeners/deceaseddomicile');
const deceasedDomicileCy = require('app/resources/cy/translation/screeners/deceaseddomicile');

module.exports = async function(language ='en', answer) {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;
    const deceasedDomicileContent = language === 'en' ? deceasedDomicileEn : deceasedDomicileCy;

    await I.checkPageUrl('app/steps/ui/screeners/deceaseddomicile');
    if (language === 'en') {
        await I.waitForText(deceasedDomicileContent.question);
        await I.see(deceasedDomicileContent.hintText1);
    }

    const locator = {css: `#domicile${answer}`};
    await I.waitForElement(locator);
    await I.click(locator);
    await I.navByClick(commonContent.continue);
};
