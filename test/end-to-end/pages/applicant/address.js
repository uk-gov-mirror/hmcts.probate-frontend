'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');
const pagePath = require('app/steps/ui/applicant/address');

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;
    await I.seeInCurrentUrl(pagePath.getUrl());
    await I.enterAddress();
    await I.navByClick(commonContent.saveAndContinue);
};
