'use strict';

const testConfig = require('config');
const useIdam = testConfig.TestUseIdam;
const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');

module.exports = async function (language ='en', noScreenerQuestions = false) {
    const commonContent = language === 'en' ? contentEn : contentCy;
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
        // const idamEnglishPage = await I.checkForText(welshLink, 40);
        // await I.takeScreenshot();
        // if (language ==='cy' && idamEnglishPage) {
        //     console.log('inside Method');
        //     await I.click(welshLink);
        // }
        await I.fillField('username', process.env.testCitizenEmail);
        await I.fillField('password', process.env.testCitizenPassword);
        await I.navByClick(commonContent.signIn);
    }
};
