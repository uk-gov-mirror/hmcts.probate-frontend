'use strict';

const taskListContent = require('app/resources/en/translation/tasklist');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const {forEach, head} = require('lodash');
const testConfig = require('test/config.js');
//const randomstring = require('randomstring');

let grabIds;

Feature('Multiple Executors flow');

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
BeforeSuite(() => {
    TestConfigurator.getBefore();
});

// eslint-disable-next-line no-undef
AfterSuite(() => {
    TestConfigurator.getAfter();
});

Scenario(TestConfigurator.idamInUseText('Multiple Executors Journey - Main applicant: 1st stage of completing application'), function* (I) {

    // Pre-IDAM
    I.startApplication();
    I.selectDeathCertificate('Yes');
    I.selectDeceasedDomicile('Yes');
    I.selectIhtCompleted('Yes');
    I.selectPersonWhoDiedLeftAWill('Yes');
    I.selectOriginalWill('Yes');
    I.selectApplicantIsExecutor('Yes');
    I.selectMentallyCapable('Yes');
    I.startApply();

    // IDAM
    //   emailId = randomstring.generate(9).toLowerCase()+'@example.com';
    // TestConfigurator.createAUser(emailId);
    // I.signInWith(emailId, 'Probate123');
    I.authenticateWithIdamIfAvailable();

    // DeceasedTask
    I.selectATask(taskListContent.taskNotStarted);
    I.enterDeceasedName('Deceased First Name', 'Deceased Last Name');
    I.enterDeceasedDateOfBirth('01', '01', '1950');
    I.enterDeceasedDateOfDeath('01', '01', '2017');
    I.enterDeceasedAddress();
    I.selectDocumentsToUpload();
    I.selectInheritanceMethodPaper();

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.enterGrossAndNet('IHT205', '600000', '300000');
    } else {
        I.enterGrossAndNet('IHT205', '500', '400');
    }

    I.selectDeceasedAlias('Yes');
    I.selectOtherNames('2');
    I.selectDeceasedMarriedAfterDateOnWill('No');
    I.selectWillCodicils('Yes');
    I.selectWillNoOfCodicils('3');

    // ExecutorsTask
    I.selectATask(taskListContent.taskNotStarted);
    I.enterApplicantName('Applicant First Name', 'Applicant Last Name');
    I.selectNameAsOnTheWill('No');
    I.enterApplicantAlias('Bob Alias');
    I.enterApplicantAliasReason('aliasOther', 'Because YOLO');
    I.enterApplicantPhone();
    I.enterAddressManually();

    const totalExecutors = '7';
    I.enterTotalExecutors(totalExecutors);
    I.enterExecutorNames(totalExecutors);
    I.selectExecutorsAllAlive('No');

    const executorsWhoDiedList = ['2', '7'];
    let diedBefore = true;
    I.selectExecutorsWhoDied(executorsWhoDiedList);

    forEach(executorsWhoDiedList, executorNumber => {
        I.selectExecutorsWhenDied(executorNumber, diedBefore, head(executorsWhoDiedList) === executorNumber);

        if (diedBefore) {
            diedBefore = false;
        } else {
            diedBefore = true;
        }
    });

    I.selectExecutorsApplying();

    const executorsApplyingList = ['3', '5'];
    I.selectExecutorsDealingWithEstate(executorsApplyingList);

    I.selectExecutorsWithDifferentNameOnWill();

    const executorsWithDifferentNameIdList = ['2']; // ie 1 is the HTML id for executor 3, 2 is the HTML id for executor 5
    I.selectWhichExecutorsWithDifferentNameOnWill(executorsWithDifferentNameIdList);

    const executorsWithDifferentNameList = ['5'];
    forEach(executorsWithDifferentNameList, executorNumber => {
        I.enterExecutorCurrentName(executorNumber, head(executorsWithDifferentNameList) === executorNumber);
        I.enterExecutorCurrentNameReason(executorNumber, 'aliasOther', 'executor_alias_reason');
    });

    forEach(executorsApplyingList, executorNumber => {
        I.enterExecutorContactDetails(executorNumber, head(executorsApplyingList) === executorNumber);
        I.enterExecutorManualAddress(executorNumber);
    });

    const executorsAliveList = ['4', '6'];
    let powerReserved = true;
    forEach(executorsAliveList, executorNumber => {
        I.selectExecutorRoles(executorNumber, powerReserved, head(executorsAliveList) === executorNumber);

        if (powerReserved) {
            I.selectHasExecutorBeenNotified('Yes', executorNumber);
            powerReserved = false;
        } else {
            powerReserved = true;
        }
    });

    // Review and confirm Task
    I.selectATask(taskListContent.taskNotStarted);
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();

    // Notify additional executors Dealing with estate
    I.notifyAdditionalExecutors();

    //Retrieve the email urls for additional executors
    I.amOnPage(testConfig.TestInviteIdListUrl);
    grabIds = yield I.grabTextFrom('pre');
}).retry(TestConfigurator.getRetryScenarios());

Scenario(TestConfigurator.idamInUseText('Additional Executor(s) Agree to Statement of Truth'), function* (I) {
    const idList = JSON.parse(grabIds);

    for (let i=0; i < idList.ids.length; i++) {
        I.amOnPage(testConfig.TestInvitationUrl + '/' + idList.ids[i]);
        I.amOnPage(testConfig.TestE2EFrontendUrl + '/pin');

        const grabPins = yield I.grabTextFrom('pre');
        const pinList = JSON.parse(grabPins);

        yield I.clickBrowserBackButton();

        I.enterPinCode(pinList.pin.toString());
        I.seeCoApplicantStartPage();

        I.agreeDisagreeDeclaration('Agree');

        I.seeAgreePage(i);

    }
});

Scenario(TestConfigurator.idamInUseText('Continuation of Main applicant journey: final stage of application'), function* (I) {

    // Pre-IDAM
    I.startApplication();
    I.selectDeathCertificate('Yes');
    I.selectDeceasedDomicile('Yes');
    I.selectIhtCompleted('Yes');
    I.selectPersonWhoDiedLeftAWill('Yes');
    I.selectOriginalWill('Yes');
    I.selectApplicantIsExecutor('Yes');
    I.selectMentallyCapable('Yes');
    I.startApply();

    // IDAM
    //    I.signInWith(emailId, 'Probate123');
    I.authenticateWithIdamIfAvailable();

    // Extra copies task
    I.selectATask(taskListContent.taskNotStarted);

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.enterUkCopies('5');
        I.selectOverseasAssets();
        I.enterOverseasCopies('7');
    } else {
        I.enterUkCopies('0');
        I.selectOverseasAssets();
        I.enterOverseasCopies('0');
    }

    I.seeCopiesSummary();

    // PaymentTask
    I.selectATask(taskListContent.taskNotStarted);
    I.seePaymentBreakdownPage();

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.seeGovUkPaymentPage();
        I.seeGovUkConfirmPage();
    }

    I.seePaymentStatusPage();

    // Send Documents Task
    I.seeDocumentsPage();

    // Thank You - Application Complete Task
    I.seeThankYouPage();
});
