'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language ='en', executorNumber) {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.checkPageUrl('app/steps/ui/executors/currentname', '*');
    await I.fillField('#currentName', `Executor${executorNumber} Current Name`);
    await I.navByClick(commonContent.saveAndContinue);
};
