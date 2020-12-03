'use strict';

const config = require('config');
const commonContent = require('app/resources/en/translation/common');
const content = require('app/resources/en/translation/deceased/foreigndeathcerttranslation');

module.exports = async function(answer) {
    const I = this;

    await I.checkPageUrl('app/steps/ui/deceased/foreigndeathcerttranslation');
    await I.waitForText(content.question, config.TestWaitForTextToAppear);
    const locator = {css: `#foreignDeathCertTranslation${answer}`};
    await I.waitForElement(locator);
    await I.click(locator);

    await I.navByClick(commonContent.saveAndContinue);
};
