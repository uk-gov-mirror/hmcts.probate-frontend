'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language ='en', executorNumber, aliasOther) {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;
    await I.checkPageUrl('app/steps/ui/executors/currentnamereason', parseInt(executorNumber)-3);
    await I.click('#currentNameReason-4');

    if (aliasOther) {
        await I.fillField('#otherReason', aliasOther);
    }

    await I.navByClick(commonContent.saveAndContinue);
};
