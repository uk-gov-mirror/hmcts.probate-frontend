'use strict';

module.exports = async function(language = 'en') {
    const I = this;
    const eeDeceasedDodContent = require(`app/resources/${language}/translation/screeners/eedeceaseddod`);
    const commonContent = require(`app/resources/${language}/translation/common`);
    await I.checkInUrl('/ee-deceased-dod');

    const locator = {css: '#eeDeceasedDod'};
    let question = eeDeceasedDodContent.question;
    if (question.includes('&#770;')) {
        question = question.split('o&#770;')[0];
    }
    await I.see(question);
    await I.waitForText(question);
    await I.waitForEnabled(locator);
    await I.click(locator);
    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
