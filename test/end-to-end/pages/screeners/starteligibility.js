'use strict';
/* eslint no-console: 0 no-unused-vars: 0 */
/* eslint-disable no-undef */
const pageUnderTest = require('app/steps/ui/screeners/starteligibility');

module.exports = function (checkCookieBannerExists) {
    const I = this;

    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    if (checkCookieBannerExists) {
        I.waitForElement('div#global-cookie-message', 60);
    }

    I.waitForNavigationToComplete('.button.button-start');
};
