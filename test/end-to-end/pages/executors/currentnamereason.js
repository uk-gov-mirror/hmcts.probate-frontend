'use strict';

const commonContent = require('app/resources/en/translation/common');

module.exports = async function(executorNumber, aliasOther) {
    const I = this;

    await I.checkPageUrl('app/steps/ui/executors/currentnamereason', parseInt(executorNumber)-3);
    await I.click('#currentNameReason-4');

    if (aliasOther) {
        await I.fillField('#otherReason', aliasOther);
    }

    await I.navByClick(commonContent.saveAndContinue);
};
