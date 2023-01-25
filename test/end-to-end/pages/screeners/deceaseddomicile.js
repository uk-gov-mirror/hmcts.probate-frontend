'use strict';

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = require(`app/resources/${language}/translation/common`);
    const deceasedDomicileContent = require(`app/resources/${language}/translation/screeners/deceaseddomicile`);

    await I.waitForText(deceasedDomicileContent.question);
    await I.checkInUrl('/deceased-domicile');
    let hintText1 = deceasedDomicileContent.hintText1;
    hintText1 = hintText1.split('>')[0].split('<a')[0] + hintText1.split('</a>')[0].split('>')[1] + hintText1.split('</a>')[1];
    await I.see(hintText1);
    const locator = {css: '#domicile'};
    await I.waitForEnabled(locator);

    await I.click(locator);
    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
