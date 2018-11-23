'use strict';

const taskListContent = require('../../../../app/resources/en/translation/tasklist');
const TestConfigurator = new (require('../../helpers/TestConfigurator'))();

Feature('Intestacy Screeners Questions flow');

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

Scenario(TestConfigurator.idamInUseText('Intestacy Screeners Questions Journey'), function* (I) {

    // Eligibility Task (pre IdAM)
    I.startEligibility();
    I.selectDeathCertificate();
    I.selectDeceasedDomicile();
    I.selectIhtCompleted();
    I.selectPersonWhoDiedLeftAWill();
    I.selectDiedAfterOctober2014();
    I.selectRelationshipToDeceased();
    I.selectOtherApplicants();
    I.startApply();

}).retry(TestConfigurator.getRetryScenarios());
