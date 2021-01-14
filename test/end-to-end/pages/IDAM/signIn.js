'use strict';

const testConfig = require('config');
const useIdam = testConfig.TestUseIdam;

module.exports = async function (language ='en', noScreenerQuestions = false) {
    if (useIdam === 'true') {
        const I = this;
        if (noScreenerQuestions) {
            await I.amOnLoadedPage('/', language);
        }

        const locator = {css: 'a[href="/sign-out"]'};
        const numEls = await I.grabNumberOfVisibleElements(locator);
        if (numEls > 0) {
            await I.navByClick(locator);
            await I.navByClick({css: 'a[href="/dashboard"]'});
        }
        const url = await I.grabCurrentUrl();
        console.log('url' + url);
        await I.fillField('username', process.env.testCitizenEmail);
        await I.fillField('password', process.env.testCitizenPassword);
        await I.navByClick('//input[@class=\'button\' and @type=\'submit\']');
    }
};
