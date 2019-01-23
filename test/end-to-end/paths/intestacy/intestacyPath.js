'use strict';

const TestConfigurator = new (require('../../helpers/TestConfigurator'))();

Feature('Intestacy flow');

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

Scenario(TestConfigurator.idamInUseText('Intestacy Journey'), function* (I) {

    // Eligibility Task (pre IdAM)
    I.startEligibility();

    I.selectDeathCertificate('No');
    I.seeStopPage('deathCertificate');
    I.selectDeathCertificate('Yes');

    I.selectDeceasedDomicile('No');
    I.seeStopPage();
    I.selectDeathCertificate('Yes');

    I.selectIhtCompleted('No');
    I.seeStopPage();
    I.selectIhtCompleted('Yes');

    I.selectPersonWhoDiedLeftAWill('No');

    I.selectDiedAfterOctober2014('No');
    I.seeStopPage();
    I.selectDiedAfterOctober2014('Yes');

    I.selectRelationshipToDeceased('No');
    I.seeStopPage();
    I.selectRelationshipToDeceased('Yes');

    I.selectOtherApplicants('Yes');
    I.seeStopPage();
    I.selectOtherApplicants('No');

    I.startApply();

}).retry(TestConfigurator.getRetryScenarios());
