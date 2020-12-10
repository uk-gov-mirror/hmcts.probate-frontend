'use strict';

const commonContent = require('app/resources/en/translation/common');

module.exports = async function(answer) {
    const I = this;

    await I.checkPageUrl('app/steps/ui/deceased/maritalstatus');
    const locator = {css: `#maritalStatus${answer}`};

    await I.waitForElement(locator);
    await I.click(locator);
    await I.navByClick(commonContent.saveAndContinue);
};
