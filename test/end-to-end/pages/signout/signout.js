'use strict';

const pageUnderTest = require('app/steps/ui/signout');

module.exports = async function() {
    const I = this;
    await I.seeInCurrentUrl(pageUnderTest.getUrl());
    await I.navByClick('#main-content > div > div > p:nth-child(3) > a');
};
