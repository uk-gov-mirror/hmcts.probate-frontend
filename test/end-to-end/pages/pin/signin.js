'use strict';

const pageUnderTest = require('app/steps/ui/pin/signin');

module.exports = function (pinCode) {
    const I = this;

    I.waitInUrl(pageUnderTest.getUrl());

    I.fillField('#pin', pinCode);

    I.waitForNavigationToComplete('.button');
};
