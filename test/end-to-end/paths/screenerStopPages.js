'use strict';

const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();

Feature('Screeners Stop Pages');

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

Scenario(TestConfigurator.idamInUseText('Screeners Stop Pages Flow'), function* (I) {

    I.startApplication();

    I.selectDeathCertificate('No');
    I.selectStopPage('deathCertificate', 'Sorry, you can’t use the online service', ['interim death certificate']);
    I.selectDeathCertificate('Yes');

    I.selectDeceasedDomicile('No');
    I.selectStopPage('notInEnglandOrWales', 'Sorry, you can’t use the online service', ['probate application form PA1A']);
    I.selectDeceasedDomicile('Yes');

    I.selectIhtCompleted('No');
    I.selectStopPage('ihtNotCompleted', 'Sorry, you can’t use the online service', ['inheritance tax form']);
    I.selectIhtCompleted('Yes');

    I.selectPersonWhoDiedLeftAWill('No');
    I.selectStopPage('noWill', 'Sorry, you can’t use the online service', ['who inherits if someone dies without a will', 'probate application form PA1A']);
    I.selectPersonWhoDiedLeftAWill('Yes');

    I.selectOriginalWill('No');
    I.selectStopPage('notOriginal', 'Sorry, you can’t use the online service', ['probate application form PA1P', 'probate application form PA1A']);
    I.selectOriginalWill('Yes');

    I.selectApplicantIsExecutor('No');
    I.selectStopPage('notExecutor', 'Sorry, you can’t use the online service', 'probate application form PA1P');
    I.selectApplicantIsExecutor('Yes');

    I.selectMentallyCapable('No');
    I.selectStopPage('mentalCapacity', 'Sorry, you can’t use the online service', ['probate application form PA1P', 'complete a ‘mental capacity form']);
    I.selectMentallyCapable('Yes');

    I.startApply();

}).retry(TestConfigurator.getRetryScenarios());
