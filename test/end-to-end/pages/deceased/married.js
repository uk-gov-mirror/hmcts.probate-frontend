'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');
const config = require('config');

module.exports = async function(language ='en', answer) {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.checkPageUrl('app/steps/ui/deceased/married');
    if (language === 'en') {
        await I.waitForText('get married or enter into a civil partnership', config.TestWaitForTextToAppear);
    }

    const locator = {css: `#married${answer}`};
    await I.waitForElement(locator);
    await I.click(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
