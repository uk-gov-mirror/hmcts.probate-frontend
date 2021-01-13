'use strict';

const testConfig = require('config');
const useIdam = testConfig.TestUseIdam;
const welshLink = 'Cymraeg';

module.exports = async function (language ='en', noScreenerQuestions = false) {
    if (useIdam === 'true') {
        const I = this;
        console.log('IDAM True....   ');
        if (noScreenerQuestions) {
            await I.amOnLoadedPage('/', language);
        }

        const locator = {css: 'a[href="/sign-out"]'};
        const numEls = await I.grabNumberOfVisibleElements(locator);
        if (numEls > 0) {
            await I.navByClick(locator);
            await I.navByClick({css: 'a[href="/dashboard"]'});
        }
        const idamEnglishPage = await I.checkForText(welshLink, 40);
        await I.takeScreenshot();
        if (language ==='cy' && idamEnglishPage) {
            console.log('inside Method   ');
            await I.click(welshLink);
        }
        await I.fillField('username', process.env.testCitizenEmail);
        await I.fillField('password', process.env.testCitizenPassword);
        await I.navByClick({xpath: '//input[@type=\'submit\']'});
    }
};
