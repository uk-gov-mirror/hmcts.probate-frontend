'use strict';

module.exports = async function(language = 'en') {
    const I = this;
    const eeEstateValuedContent = require(`app/resources/${language}/translation/screeners/eeestatevalued`);
    const commonContent = require(`app/resources/${language}/translation/common`);
    await I.checkInUrl('/ee-estate-valued');

    const locator = {css: '#eeEstateValued'};
    await I.waitForText(eeEstateValuedContent.question);
    let hint = eeEstateValuedContent.hint;
    hint = hint.split('>')[0].split('<a')[0] + hint.split('</a>')[0].split('>')[1] + hint.split('</a>')[1].split('<a')[0] + hint.split('</a>')[1].split('>')[1] + hint.split('</a>')[2];
    await I.see(hint);
    await I.waitForEnabled(locator);
    await I.click(locator);
    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
