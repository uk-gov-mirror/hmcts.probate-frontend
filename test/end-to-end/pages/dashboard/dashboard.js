'use strict';

module.exports = async function() {
    const I = this;

    await I.checkInUrl('/dashboard');
    await I.waitForElement({css: 'a[href="/start-eligibility"]'});
    await I.waitForText('In progress');
    await I.navByClick({css: 'a[href^="/get-case/"]'});
};
