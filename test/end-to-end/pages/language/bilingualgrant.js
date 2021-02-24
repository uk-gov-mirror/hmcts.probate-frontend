'use strict';

const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');

module.exports = async function(language = 'en', answer) {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.checkPageUrl('app/steps/ui/language');
    let locator = '';
    if (answer === '-2') {
        locator = {xpath: '//*[@type="radio" and @value="optionNo"]'};
    } else {
        locator = {xpath: '//*[@type="radio" and @value="optionYes"]'};
    }
    await I.wait(20);
    await I.waitForEnabled(locator, 5);
    await I.seeCheckboxIsChecked(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
