'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language ='en', answer) {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.checkPageUrl('app/steps/ui/screeners/otherapplicants');
    const locator = {css: `#otherApplicants${answer}`};
    await I.waitForElement(locator);
    await I.click(locator);

    await I.navByClick(commonContent.continue);
};
