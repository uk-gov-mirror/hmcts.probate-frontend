/* eslint-disable no-await-in-loop */
'use strict';

const dashboardEn = require('app/resources/en/translation/dashboard');
const dashboardCy = require('app/resources/cy/translation/dashboard');
const testConfig = require('config');

module.exports = async function(language ='en') {
    const I = this;
    const dashboardContent = language === 'en' ? dashboardEn : dashboardCy;
    await I.checkPageUrl('app/steps/ui/dashboard');
    const languageToggleLink = await I.grabTextFrom('//a[@class =\'govuk-link language\']');
    console.log(languageToggleLink);

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
    } else {
        console.log('Welsh Dashboard...');
        await I.amOnLoadedPage('app/steps/ui/dashboard?lng=cy', language);
        for (let i = 0; i <= 5; i++) {
            const result = await I.checkForText(dashboardContent.actionContinue, 5);
            if (result === true) {
                break;
            }
            await I.refreshPage();
        }
        await I.navByClick(dashboardContent.actionContinue);
        await I.wait(2);
    }
};
