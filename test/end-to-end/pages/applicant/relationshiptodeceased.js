'use strict';

const commonContent = require('app/resources/en/translation/common');

module.exports = async function(answer) {
    const I = this;

    await I.checkPageUrl('app/steps/ui/applicant/relationshiptodeceased');
    const locator = {css: `#relationshipToDeceased${answer}`};
    await I.click(locator);

    await I.navByClick(commonContent.saveAndContinue);
};
