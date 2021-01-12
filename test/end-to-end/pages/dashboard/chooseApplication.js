/* eslint-disable no-await-in-loop */
'use strict';

const dashboardEn = require('app/resources/en/translation/dashboard');
const dashboardCy = require('app/resources/cy/translation/dashboard');
const testConfig = require('config');
const pageUnderTest = require('app/steps/ui/dashboard');

module.exports = async function(language ='en') {
    const I = this;
    const dashboardContent = language === 'en' ? dashboardEn : dashboardCy;
    await I.checkPageUrl('app/steps/ui/dashboard');

    // we do need to allow refreshing the page here as it takes time to populate ccd, and storing data in the ccd
    // database gives a success before is actually populated, so is async.
    if (language === 'en') {
        for (let i = 0; i <= 5; i++) {
            await I.waitForText(dashboardContent.header, testConfig.TestWaitForTextToAppear);
            const result = await I.checkForText('Continue application', 5);
            if (result === true) {
                break;
            }
            await I.refreshPage();
        }

        await I.see(dashboardContent.tableHeaderCcdCaseId);
        await I.see(dashboardContent.tableHeaderDeceasedName);
        await I.see(dashboardContent.tableHeaderCreateDate);
        await I.see(dashboardContent.tableHeaderCaseStatus);
        await I.navByClick(dashboardContent.actionContinue);
    }

    if (language === 'cy') {
        for (let i = 0; i <= 5; i++) {
            const result = await I.checkForText(dashboardContent.actionContinue, 3);
            if (result === false) {
                console.log('True Block ....');
                await I.amOnLoadedPage(pageUnderTest.getUrl(), language);
                await I.navByClick(dashboardContent.actionContinue);
                break;
            } else {
                console.log('Else Block ....');
                await I.amOnLoadedPage(pageUnderTest.getUrl(), language);
                await I.navByClick(dashboardContent.actionContinue);
            }
            await I.refreshPage();
        }
    }
};
