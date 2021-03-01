'use strict';

module.exports = async function() {
    const I = this;

    await I.checkPageUrl('app/steps/ui/dashboard');
    await I.waitForElement({css: 'a[href="/start-eligibility"]'});
    await I.waitForText('Continue application');
    await I.navByClick('Continue application');
};
