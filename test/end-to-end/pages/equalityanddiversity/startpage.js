'use strict';

const config = require('config');
const equalityEn = 'Equality and diversity questions';
const equalityCy = 'Dydw i ddim eisiau ateb y cwestiynau hyn';

module.exports = async function(language ='en') {
    const I = this;
    const equalityContent = language === 'en' ? equalityEn : equalityCy;
    await I.wait(3);
    const backButtonLocator = {css: '#back-button'};
    await I.waitForElement(backButtonLocator, config.TestWaitForElementToAppear);
    if (language === 'en') {
        await I.waitForText(equalityContent, config.TestWaitForTextToAppear);
    }
    await I.navByClick(backButtonLocator);
};
