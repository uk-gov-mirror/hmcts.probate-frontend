'use strict';

const randomstring = require('randomstring');
const taskListContent = require('app/resources/en/translation/tasklist');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const testConfig = require('test/config.js');

Feature('Save And Close Link Functionality');

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
Before(() => {
    TestConfigurator.getBefore();
});

// eslint-disable-next-line no-undef
After(() => {
    TestConfigurator.getAfter();
});

// eslint-disable-next-line no-undef
xScenario(TestConfigurator.idamInUseText('Save And Close Link Click Flow'), function* (I) {

    //Screeners & Pre-IDAM
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
    const emailId = randomstring.generate(9).toLowerCase()+'@example.com';
    TestConfigurator.createAUser(emailId);
    I.signInWith(emailId, 'Probate123');

    // Deceased Details
    I.selectATask(taskListContent.taskNotStarted);
    I.enterDeceasedName('Deceased First Name', 'Deceased Last Name');
    I.enterDeceasedDateOfBirth('01', '01', '1950');
    I.enterDeceasedDateOfDeath('01', '01', '2017');
    I.enterDeceasedAddress();
    I.awaitNavigation(() => I.click('Save and close'));
    I.see('You’ve signed out');
    I.seeCurrentUrlEquals(testConfig.TestE2EFrontendUrl+'/sign-out');
    I.awaitNavigation(() => I.click('sign back in'));
    //I.seeInCurrentUrl(testConfig.TestIdamLoginUrl);
});
