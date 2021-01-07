'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');
const pagePath = require('app/steps/ui/will/codicils');

module.exports = async function(language = 'en', option) {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.seeInCurrentUrl(pagePath.getUrl());
    const locator = {css: `#codicils${option}`};
    await I.waitForElement(locator);
    await I.click(locator);

    await I.navByClick(commonContent.saveAndContinue);
};
