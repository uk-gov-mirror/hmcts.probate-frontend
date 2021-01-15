'use strict';

const taskListContent = require('app/resources/en/translation/tasklist');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const optionYes = '';
const ihtPost = '';
const optionNo = '-2';
const optionDeathCertificate = '';
const uploadingDocuments = false;
const config = require('config');

Feature('Complete PQC questions...').retry(TestConfigurator.getRetryFeatures());

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
Before(async () => {
    await TestConfigurator.initLaunchDarkly();
    await TestConfigurator.getBefore();
});

// eslint-disable-next-line no-undef
After(() => {
    TestConfigurator.getAfter();
});

Scenario(TestConfigurator.idamInUseText('Complete journey of the Equality and Diversity Questions'), async (I) => {
    await I.retry(2).createAUser(TestConfigurator);

    const useNewDeathCertFlow = await TestConfigurator.checkFeatureToggle(config.featureToggles.ft_new_deathcert_flow);

    // Eligibility Task (pre IdAM)
    await I.startApplication();
    await I.selectDeathCertificate(optionYes);

    if (useNewDeathCertFlow) {
        await I.selectDeathCertificateInEnglish(optionYes);
    }

    await I.selectDeceasedDomicile(optionYes);
    await I.selectIhtCompleted(optionYes);
    await I.selectPersonWhoDiedLeftAWill(optionYes);
    await I.selectOriginalWill(optionYes);
    await I.selectApplicantIsExecutor(optionYes);
    await I.selectMentallyCapable(optionYes);
    await I.startApply();

    // IdAM
    await I.authenticateWithIdamIfAvailable();

    // Dashboard
    await I.chooseApplication();

    // Deceased Task
    await I.selectATask(taskListContent.taskNotStarted);
    await I.chooseBiLingualGrant(optionNo);
    await I.enterDeceasedName('Deceased First Name', 'Deceased Last Name');
    await I.enterDeceasedDateOfBirth('01', '01', '1950');
    await I.enterDeceasedDateOfDeath('01', '01', '2019');
    await I.enterDeceasedAddress();

    if (useNewDeathCertFlow) {
        await I.selectDiedEngOrWales(optionYes);
        await I.selectDeathCertificateInterim(optionDeathCertificate);
    } else {
        await I.selectDocumentsToUpload(uploadingDocuments);
    }

    await I.selectInheritanceMethod(ihtPost);
    await I.enterGrossAndNet('205', '500', '400');
    await I.selectDeceasedAlias(optionNo);
    await I.selectDeceasedMarriedAfterDateOnWill(optionNo);
    await I.selectWillCodicils(optionNo);

    // ExecutorsTask
    await I.selectATask(taskListContent.taskNotStarted);
    await I.enterApplicantName('Applicant First Name', 'Applicant Last Name');
    await I.selectNameAsOnTheWill(optionYes);
    await I.enterApplicantPhone();
    await I.enterAddressManually();

    const totalExecutors = '1';
    await I.enterTotalExecutors(totalExecutors);

    // Equality and Diversity questions
    if (TestConfigurator.equalityAndDiversityEnabled()) {
        await I.clickAnswerQuestions();
        await I.answerBirthdayQuestion();
        await I.answerMainLanguageQuestion();
        await I.answerYourSexQuestion();
        await I.answerGenderQuestion();
        await I.answerSexualOrientationQuestion();
        await I.answerMaritalStatusQuestion();
        await I.answerEthnicGroupQuestion();
        await I.answerReligionQuestion();
        await I.answerDisabilityQuestion();
        await I.answerPregnancyQuestion();
        await I.clickContinueToNextSteps();
    }
}).retry(TestConfigurator.getRetryScenarios())
    .tag('@e2e');
