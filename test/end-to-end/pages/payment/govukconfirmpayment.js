'use strict';
const contentEn = 'Payment summary';
const contentCy = 'Crynodeb o\'r taliad';

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    if (language === 'en') {
        await I.waitForText(commonContent);
    }
    const locator = {css: '#confirm'};
    await I.waitForElement(locator);
    await I.navByClick(locator);
};
