'use strict';

module.exports = async function(language ='en', answer = null) {
    const I = this;
    const relatedToDeceasedContent = require(`app/resources/${language}/translation/screeners/relatedtodeceased`);
    const commonContent = require(`app/resources/${language}/translation/common`);

    await I.checkInUrl('/related-to-deceased');
    await I.waitForText(relatedToDeceasedContent.question);
    await I.see(relatedToDeceasedContent.hintText1);
    await I.see(relatedToDeceasedContent.hintText2);
    const locator = {css: `#related${answer}`};
    await I.waitForEnabled(locator);
    await I.click(locator);

    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
