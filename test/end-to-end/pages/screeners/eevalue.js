'use strict';

module.exports = async function(language = 'en') {
    const I = this;
    const eeEstateValuedContent = require(`app/resources/${language}/translation/screeners/eeestatevalued`);
    const commonContent = require(`app/resources/${language}/translation/common`);
    await I.checkInUrl('/ee-estate-valued');

    const locator = {css: '#eeEstateValued'};
    let question = eeEstateValuedContent.question;
    if (question.includes('&#770;')) {
        question = question.split('a&#770;')[0];
    }
    if (question.includes('&rsquo;')) {
        question = question.split('&rsquo;')[0];
    }
    await I.see(question);
    await I.waitForText(question);
    await I.waitForEnabled(locator);
    await I.click(locator);
    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
