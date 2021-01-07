'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');
const pageUnderTest = require('app/steps/ui/deceased/address');

module.exports = async function(language = 'en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;
    await I.seeInCurrentUrl(pageUnderTest.getUrl());
    await I.enterAddress();
    await I.navByClick(commonContent.saveAndContinue);
};
