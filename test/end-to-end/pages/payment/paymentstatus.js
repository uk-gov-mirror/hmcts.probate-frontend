'use strict';

const pageUnderTest = require('app/steps/ui/payment/status');

module.exports = function () {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.navByClick('.button');
};
