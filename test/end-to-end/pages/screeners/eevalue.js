'use strict';

module.exports = async function(language = 'en') {
    const I = this;
    const eeEstateValuedContent = require(`app/resources/${language}/translation/screeners/eeestatevalued`);
    const commonContent = require(`app/resources/${language}/translation/common`);
    await I.checkInUrl('/ee-estate-valued');

    const locator = {css: '#eeEstateValued'};
    let question = eeEstateValuedContent.question;
    if (question.contains('&#770;')) {
        question = question.replace('a&#770;', 'â');
    }
    if (question.contains('&rsquo;')) {
        question = question.replace('&rsquo;', '’');
    }
    await I.waitForText(question);
    await I.see(question);
    await I.waitForEnabled(locator);
    await I.click(locator);
    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
