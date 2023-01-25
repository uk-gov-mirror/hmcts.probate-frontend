'use strict';

module.exports = async function(language ='en', answer = null) {
    const I = this;
    const commonContent = require(`app/resources/${language}/translation/common`);
    const mentalCapacityContent = require(`app/resources/${language}/translation/screeners/mentalcapacity`);

    await I.checkInUrl('/mental-capacity');
    await I.waitForText(mentalCapacityContent.question);
    await I.see(mentalCapacityContent.hintText1);
    let hintText2 = mentalCapacityContent.hintText2;
    hintText2 = hintText2.split('>')[0].split('<a')[0] + hintText2.split('</a>')[0].split('>')[1] + hintText2.split('</a>')[1];
    await I.see(hintText2);

    const locator = {css: `#mentalCapacity${answer}`};
    await I.waitForEnabled(locator);
    await I.click(locator);
    await I.navByClick(commonContent.continue, 'button.govuk-button');
};
