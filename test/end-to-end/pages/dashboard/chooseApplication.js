/* eslint-disable no-await-in-loop */
'use strict';

const dashboardEn = require('app/resources/en/translation/dashboard');
const dashboardCy = require('app/resources/cy/translation/dashboard');
const testConfig = require('config');
const pageUnderTest = require('app/steps/ui/dashboard');
const welshLink = 'Cymraeg';

module.exports = async function(language ='en') {
    const I = this;
    const dashboardContent = language === 'en' ? dashboardEn : dashboardCy;
    await I.checkPageUrl('app/steps/ui/dashboard');

    // we do need to allow refreshing the page here as it takes time to populate ccd, and storing data in the ccd
    // database gives a success before is actually populated, so is async.
    if (language === 'en') {
        for (let i = 0; i <= 5; i++) {
            await I.waitForText(dashboardContent.header, testConfig.TestWaitForTextToAppear);
            const result = await I.checkForText(dashboardContent.actionContinue, 5);
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
    if (language === 'cy' && welshLink === 'Cymraeg') {
        await I.amOnLoadedPage(pageUnderTest.getUrl(), language);
        // const text = await I.grabTextFrom(dashboardContent.actionContinue);
        // console.log('Dash Board Link Name::-->' + text);
        const englishDashBoardPage = await I.checkForText(dashboardEn.actionContinue, 10);
        if (englishDashBoardPage) {
            await I.click(welshLink);
            await I.takeScreenshot();
            console.log('Switching to Welsh Dashboard Page....');
            await I.navByClick(dashboardContent.actionContinue);
            await I.wait(2);
        } else {
            console.log('Welsh Dashboard Page...');
            await I.takeScreenshot();
            await I.navByClick(dashboardContent.actionContinue);
            await I.wait(2);

        }
    }

};
