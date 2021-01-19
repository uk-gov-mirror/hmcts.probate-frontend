'use strict';

const config = require('config');
const contentEn = require('app/resources/en/translation/coapplicant/agreepage');
const contentCy = require('app/resources/cy/translation/coapplicant/agreepage');

module.exports = async function(language = 'en') {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.checkPageUrl('app/steps/ui/coapplicant/agreepage');
    await I.waitForText(commonContent.subHeader, config.TestWaitForTextToAppear);

    // if (elementId === 0) {
    //     I.see('When everyone');
    // } else {
    //     I.see('All executors applying');
    // }
};
