/* eslint-disable no-await-in-loop */
'use strict';

const contentEn = require('app/resources/en/translation/tasklist');
const testConfig = require('config');

module.exports = async function (language ='en') {
    const I = this;
    await I.checkPageUrl('app/steps/ui/tasklist');

    // we do need to allow refreshing the page here as it takes time to populate ccd, and storing data in the ccd
    // database gives a success before is actually populated, so is async.
    if (language === 'en') {
        for (let i = 0; i <= 5; i++) {
            const result = await I.waitForText(contentEn.introduction, testConfig.TestWaitForTextToAppear);
            if (result === true) {
                break;
            }
            await I.refreshPage();
            await I.wait(3);
        }
    }
    const locator = {css: '.govuk-button'};
    await I.waitForElement(locator);
    await I.click(locator);
};
