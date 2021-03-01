'use strict';

const taskListContentEn = require('app/resources/en/translation/tasklist');
const taskListContentCy = require('app/resources/cy/translation/tasklist');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();

const optionYes = '';
const ihtPost = '';
const optionNo = '-2';
const ihtOnline = '-2';
const maritalStatusMarried = '';
const spouseOfDeceased = '';
const relationshipChildOfDeceased = '-2';
const optionRenouncing = '';
const bilingualGOP = false;
const uploadingDocuments = false;
const config = require('config');
const languages = ['en', 'cy'];

Feature('GOP Intestacy E2E');

Before(async () => {
    await TestConfigurator.initLaunchDarkly();
    await TestConfigurator.getBefore();
});

After(async () => {
    await TestConfigurator.getAfter();
});

languages.forEach(language => {

    Scenario(TestConfigurator.idamInUseText(`${language.toUpperCase()} - GOP -Intestacy Journey - Digital iht`), async (I) => {
        const taskListContent = language === 'en' ? taskListContentEn : taskListContentCy;
        await I.retry(2).createAUser(TestConfigurator);

        const useNewDeathCertFlow = await TestConfigurator.checkFeatureToggle(config.featureToggles.ft_new_deathcert_flow);

        // Eligibility Task (pre IdAM)
        await I.startApplication(language);

        // Probate Sceeners
        await I.selectDeathCertificate(language, optionYes);

        if (useNewDeathCertFlow) {
            await I.selectDeathCertificateInEnglish(language, optionNo);
            await I.selectDeathCertificateTranslation(language, optionYes);
        }

        await I.selectDeceasedDomicile(language);
        await I.selectIhtCompleted(language, optionYes);
        await I.selectPersonWhoDiedLeftAWill(language, optionNo);

        // Intestacy Sceeners
        await I.selectDiedAfterOctober2014(language, optionYes);
        await I.selectRelatedToDeceased(language, optionYes);
        await I.selectOtherApplicants(language, optionNo);

        await I.startApply(language);

        // IdAM
        await I.authenticateWithIdamIfAvailable(language);

        // Dashboard
        await I.chooseApplication(language);

        // Deceased Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.chooseBiLingualGrant(language, optionNo);
        await I.enterDeceasedDetails(language, 'Deceased First Name', 'Deceased Last Name', '01', '01', '1950', '01', '01', '2017');
        await I.enterDeceasedAddress(language);

        if (useNewDeathCertFlow) {
            await I.selectDiedEngOrWales(language, optionNo);
            await I.selectEnglishForeignDeathCert(language, optionNo);
            await I.selectForeignDeathCertTranslation(language, optionYes);
        } else {
            await I.selectDocumentsToUpload(language, uploadingDocuments);
        }

        await I.selectInheritanceMethod(language, ihtOnline);
        await I.enterIHTIdentifier(language);

        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.enterEstateValue(language, '300000', '200000');
        } else {
            await I.enterEstateValue(language, '500', '400');
        }

        await I.selectAssetsOutsideEnglandWales(language, optionYes);
        await I.enterValueAssetsOutsideEnglandWales(language, '400000');
        await I.selectDeceasedAlias(language, optionNo);
        await I.selectDeceasedMaritalStatus(language, maritalStatusMarried);

        // Executors Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.selectRelationshipToDeceased(language, spouseOfDeceased);
        await I.enterAnyChildren(language, optionNo);
        await I.enterApplicantName(language, 'ApplicantFirstName', 'ApplicantLastName');
        await I.enterApplicantPhone(language);
        await I.enterAddressManually(language);
        if (TestConfigurator.equalityAndDiversityEnabled()) {
            await I.exitEqualityAndDiversity(language);
            await I.completeEqualityAndDiversity(language);
        }

        // Check your answers and declaration
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.seeSummaryPage(language, 'declaration');
        await I.acceptDeclaration(language, bilingualGOP);

        // Copies Task
        await I.selectATask(language, taskListContent.taskNotStarted);

        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.enterUkCopies(language, '5');
            await I.selectOverseasAssets(language, optionNo);
        } else {
            await I.enterUkCopies(language, '0');
            await I.selectOverseasAssets(language, optionNo);
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
    }).tag('@e2e')
        .tag('@crossbrowser')
        .retry(TestConfigurator.getRetryScenarios());

    Scenario(TestConfigurator.idamInUseText(`${language.toUpperCase()} - GOP -Intestacy Child Journey - Paper iht, no death certificate uploaded and spouse renouncing`), async (I) => {
        const taskListContent = language === 'en' ? taskListContentEn : taskListContentCy;
        await I.retry(2).createAUser(TestConfigurator);

        const useNewDeathCertFlow = await TestConfigurator.checkFeatureToggle(config.featureToggles.ft_new_deathcert_flow);

        // Eligibility Task (pre IdAM)
        await I.startApplication(language);

        // Probate Sceeners
        await I.selectDeathCertificate(language, optionYes);

        if (useNewDeathCertFlow) {
            await I.selectDeathCertificateInEnglish(language, optionNo);
            await I.selectDeathCertificateTranslation(language, optionYes);
        }

        await I.selectDeceasedDomicile(language, optionYes);
        await I.selectIhtCompleted(language, optionYes);
        await I.selectPersonWhoDiedLeftAWill(language, optionNo);

        // Intestacy Sceeners
        await I.selectDiedAfterOctober2014(language, optionYes);
        await I.selectRelatedToDeceased(language, optionYes);
        await I.selectOtherApplicants(language, optionNo);

        await I.startApply(language);

        // IdAM
        await I.authenticateWithIdamIfAvailable(language);

        // Dashboard
        await I.chooseApplication(language);

        // Deceased Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.chooseBiLingualGrant(language, optionNo);
        await I.enterDeceasedDetails(language, 'Deceased First Name', 'Deceased Last Name', '01', '01', '1950', '01', '01', '2017');
        await I.enterDeceasedAddress(language);

        if (useNewDeathCertFlow) {
            await I.selectDiedEngOrWales(language, optionNo);
            await I.selectEnglishForeignDeathCert(language, optionNo);
            await I.selectForeignDeathCertTranslation(language, optionYes);
        } else {
            await I.selectDocumentsToUpload(language, uploadingDocuments);
        }

        await I.selectInheritanceMethod(language, ihtPost);
        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.enterGrossAndNet(language, '205', '600000', '300000');
        } else {
            await I.enterGrossAndNet(language, '205', '500', '400');
        }

        await I.selectDeceasedAlias(language, optionNo);
        await I.selectDeceasedMaritalStatus(language, maritalStatusMarried);

        // Executors Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.selectRelationshipToDeceased(language, relationshipChildOfDeceased);
        await I.selectSpouseNotApplyingReason(language, optionRenouncing);
        await I.enterAnyOtherChildren(language, optionNo);
        await I.enterApplicantName(language, 'ApplicantFirstName', 'ApplicantLastName');
        await I.enterApplicantPhone(language);
        await I.enterAddressManually(language);
        if (TestConfigurator.equalityAndDiversityEnabled()) {
            await I.exitEqualityAndDiversity(language);
            await I.completeEqualityAndDiversity(language);
        }

        // Check your answers and declaration
        await I.selectATask(language, taskListContent.taskNotStarted);
        await I.seeSummaryPage(language, 'declaration');
        await I.acceptDeclaration(language, bilingualGOP);

        // Copies Task
        await I.selectATask(language, taskListContent.taskNotStarted);
        if (TestConfigurator.getUseGovPay() === 'true') {
            await I.enterUkCopies(language, '5');
            await I.selectOverseasAssets(language, optionNo);
        } else {
            await I.enterUkCopies(language, '0');
            await I.selectOverseasAssets(language, optionNo);

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
    }).tag('@e2e')
        .retry(TestConfigurator.getRetryScenarios());
});
