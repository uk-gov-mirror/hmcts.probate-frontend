'use strict';

const pageUnderTest = require('app/steps/ui/coapplicant/startpage');

module.exports = function () {
    const I = this;

    I.waitInUrl(pageUnderTest.getUrl());

    I.waitForNavigationToComplete('.button');
};
