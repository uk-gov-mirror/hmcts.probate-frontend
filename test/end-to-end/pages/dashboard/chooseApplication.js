/* eslint-disable no-await-in-loop */
'use strict';

const dashboardEn = require('app/resources/en/translation/dashboard');
const dashboardCy = require('app/resources/cy/translation/dashboard');
const pageUnderTest = require('app/steps/ui/dashboard');

module.exports = async function(language) {
    const I = this;
    const dashboardContent = language === 'en' ? dashboardEn : dashboardCy;
    await I.seeInCurrentUrl(pageUnderTest.getUrl());

    // we do need to allow refreshing the page here as it takes time to populate ccd, and storing data in the ccd
    // database gives a success before is actually populated, so is async.
    if (language === 'en') {
        for (let i = 0; i <= 5; i++) {
            const result = await I.checkForText(dashboardContent.actionContinue);
            if (result === true) {
                break;
            }
            await I.refreshPage();
        }
        await I.waitForText(dashboardContent.header);
        await I.see(dashboardContent.tableHeaderCcdCaseId);
        await I.see(dashboardContent.tableHeaderDeceasedName);
        await I.see(dashboardContent.tableHeaderCreateDate);
        await I.see(dashboardContent.tableHeaderCaseStatus);
        await I.navByClick(dashboardContent.actionContinue);
    } else {
        console.log('refreshing the page');
        for (let i = 0; i <= 5; i++) {
            await I.amOnLoadedPage('/', language);
            const result = await I.checkForText(dashboardContent.actionContinue);
            if (result === true) {
                break;
            }
            await I.refreshPage();
        }
        await I.navByClick(dashboardContent.actionContinue);
    }

};
