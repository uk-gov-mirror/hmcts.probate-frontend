/* eslint-disable no-await-in-loop */
'use strict';

const taskListContentEn = require('app/resources/en/translation/tasklist');
const taskListContentCy = require('app/resources/cy/translation/tasklist');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const testConfig = require('config');
const config = require('config');

const optionYes = '';
const ihtPost = '';
const optionNo = '-2';
const bilingualGOP = false;
const uploadingDocuments = false;
const languages = ['en', 'cy'];

Feature('Multiple Executors flow - 5 Executors');

Before(async () => {
    await TestConfigurator.initLaunchDarkly();
    await TestConfigurator.getBefore();
});

After(async () => {
    await TestConfigurator.getAfter();
});

languages.forEach(language => {

    Scenario(TestConfigurator.idamInUseText(`${language.toUpperCase()} - Multiple Executors 5 Journey - Main applicant; Stage 1: Enter deceased and executor details`), async (I) => {
        const taskListContent = language === 'en' ? taskListContentEn : taskListContentCy;
        await I.retry(2).createAUser(TestConfigurator);

        const useNewDeathCertFlow = await TestConfigurator.checkFeatureToggle(config.featureToggles.ft_new_deathcert_flow);

        // Eligibility Task (pre IdAM)
        await I.startApplication(language);

        await I.selectDeathCertificate(language, optionYes);

        if (useNewDeathCertFlow) {
            await I.selectDeathCertificateInEnglish(language, optionNo);
            await I.selectDeathCertificateTranslation(language, optionYes);
        }

        await I.selectDeceasedDomicile(language);

        await I.selectIhtCompleted(language, optionYes);

        await I.selectPersonWhoDiedLeftAWill(language, optionYes);

        await I.selectOriginalWill(language, optionYes);

        await I.selectApplicantIsExecutor(language, optionYes);

        await I.selectMentallyCapable(language, optionYes);

        await I.startApply(language);

        // IdAM
        await I.authenticateWithIdamIfAvailable(language);

        // Dashboard
        await I.chooseApplication(language);

        // Deceased Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.chooseBiLingualGrant(language, optionNo);
        await I.enterDeceasedName(language, 'Deceased First Name', 'Deceased Last Name');
        await I.enterDeceasedDateOfBirth(language, '15', '12', '1950');
        await I.enterDeceasedDateOfDeath(language, '15', '06', '2019');
        await I.enterDeceasedAddress(language);

        //Check Launch Darkly Toggle Exists
        if (useNewDeathCertFlow) {
            await I.selectDiedEngOrWales(language, optionNo);
            await I.selectEnglishForeignDeathCert(language, optionNo);
            await I.selectForeignDeathCertTranslation(language, optionYes);
        } else {
            await I.selectDocumentsToUpload(language, uploadingDocuments);
        }

        await I.selectInheritanceMethod(language, ihtPost);

        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.enterGrossAndNet(language, '205', '80000000', '550000');
        } else {
            await I.enterGrossAndNet(language, '205', '500', '400');
        }

        await I.selectDeceasedAlias(language, optionNo);
        await I.selectDeceasedMarriedAfterDateOnWill(language, optionNo);
        await I.selectWillCodicils(language, optionNo);

        // ExecutorsTask
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.enterApplicantName(language, 'Applicant First Name', 'Applicant Last Name');
        await I.selectNameAsOnTheWill(language, optionYes);
        await I.enterApplicantPhone(language);
        await I.enterAddressManually(language);

        //Amount of Executors
        const totalExecutors = '5';
        await I.enterTotalExecutors(language, totalExecutors);
        await I.enterExecutorNames(language, totalExecutors);
        await I.selectExecutorsAllAlive(language, optionYes);

        //Executors Who are Applying
        await I.selectExecutorsApplying(language, optionYes);

        const executorsApplyingList = ['3', '4', '5']; // exec2, exec3 and exec4 are applying
        await I.selectExecutorsDealingWithEstate(language, executorsApplyingList);

        await I.selectExecutorsWithDifferentNameOnWill(language, optionNo);

        //Executors Applying Contact Details
        for (let i = 1; i <= executorsApplyingList.length; i++) {
            await I.enterExecutorContactDetails(language); //****change the email address structure
            await I.enterExecutorManualAddress(language, i);
        }

        const executorsAliveList = ['5']; //Executor Not Applying and Reserved Power
        let powerReserved = true;
        let answer = optionYes;

        if (executorsAliveList) {
            for (let i = 0; i < executorsAliveList.length; i++) {
                const executorNumber = executorsAliveList[i];
                await I.selectExecutorRoles(language, executorNumber, answer, executorsAliveList[0] === executorNumber);

                if (powerReserved) {
                    await I.selectHasExecutorBeenNotified(language, optionYes);
                }

                powerReserved = true;
                answer = optionNo;
            }
        }

        // Complete Equality & Diversity Questionnaire
        if (TestConfigurator.equalityAndDiversityEnabled()) {
            await I.exitEqualityAndDiversity(language);
            await I.completeEqualityAndDiversity(language);
        }

        // Review and Confirm Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.seeSummaryPage(language, 'declaration');
        await I.acceptDeclaration(language, bilingualGOP);

        // Notify additional executors Dealing with estate
        await I.notifyAdditionalExecutors(language);
        await I.waitForText(taskListContent.introduction, testConfig.TestWaitForTextToAppear);

        //Retrieve the email urls for additional executors
        await I.amOnPage(testConfig.TestInviteIdListUrl);
        await I.waitForElement('pre');

        //Identify Pins For Each Applying Executor
        const grabIds = await I.grabTextFrom('pre');

        let idList = null;
        try {
            idList = JSON.parse(grabIds);
        } catch (err) {
            console.error(err.message);
        }

        //For Each Applying Executor Login Using Respective Pins and Make Declaration
        for (let i = 0; i < idList.ids.length; i++) {
            await I.amOnPage(testConfig.TestInvitationUrl + '/' + idList.ids[i], language);
            const signInOrProbatePageLocator = {xpath: '//*[@name="loginForm" or @id="main-content"]'};
            await I.waitForElement(signInOrProbatePageLocator, testConfig.TestWaitForTextToAppear);
            await I.amOnPage(testConfig.TestE2EFrontendUrl + '/pin');
            await I.waitForElement('pre');

            const grabPins = await I.grabTextFrom('pre'); // eslint-disable-line no-await-in-loop
            const pinList = JSON.parse(grabPins);

            await I.clickBrowserBackButton(); // eslint-disable-line no-await-in-loop

            await I.enterPinCode(pinList.pin.toString());
            await I.seeCoApplicantStartPage(language);

            await I.agreeDeclaration(optionYes);
            await I.seeAgreePage(language);
        }

        // IDAM
        await I.authenticateWithIdamIfAvailable(language, true);

        // Dashboard
        await I.chooseApplication(language);

        // Extra Copies Task
        await I.selectATask(language, taskListContent.taskNotStarted);

        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.enterUkCopies(language, '4');
            await I.selectOverseasAssets(language, optionYes);
            await I.enterOverseasCopies(language, '6');
        } else {
            await I.enterUkCopies(language, '0');
            await I.selectOverseasAssets(language, optionYes);
            await I.enterOverseasCopies(language, '0');
        }

        await I.seeCopiesSummary(language);

        // Payment Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.seePaymentBreakdownPage(language);

        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.seeGovUkPaymentPage(language);
            await I.seeGovUkConfirmPage(language);
        }

        await I.seePaymentStatusPage(language);

        // Send Documents Task
        await I.seeDocumentsPage(language);

        // Thank You
        await I.seeThankYouPage(language);

    }).tag('@crossbrowser')
        .tag('@e2e')
        .retry(TestConfigurator.getRetryScenarios());
});
