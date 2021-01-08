'use strict';

const config = require('config');
const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');
const diedenGorwalesContentEn = require('app/resources/en/translation/deceased/diedengorwales');
const diedenGorwalesContentCy = require('app/resources/cy/translation/deceased/diedengorwales');

module.exports = async function(language = 'en', answer) {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;
    const diedenGorwalesContent = language === 'en' ? diedenGorwalesContentEn : diedenGorwalesContentCy;

    await I.checkPageUrl('app/steps/ui/deceased/diedengorwales');
    if (language === 'en') {
        await I.waitForText(diedenGorwalesContent.question, config.TestWaitForTextToAppear);
    }

    const locator = {css: `#diedEngOrWales${answer}`};
    await I.waitForElement(locator);
    await I.click(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
