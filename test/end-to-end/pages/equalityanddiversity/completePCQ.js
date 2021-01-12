'use strict';

const config = require('config');
const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.wait(3);

    await I.waitForText(commonContent.equalityQuestions, config.TestWaitForTextToAppear);
    await I.navByClick(commonContent.continueToQuestions);

    for (let i = 0; i < 10; i++) {
        I.wait(2);
        I.navByClick(commonContent.preferNotToSay);
        I.wait(2);
        I.navByClick(commonContent.continue);
    }

    await I.navByClick(commonContent.continueNextSteps);
};
