'use strict';

const content = require('app/resources/en/translation/payment/status');
const pageUnderTest = require('app/steps/ui/payment/status');

module.exports = function () {
    const I = this;

    I.waitForText(content.question, 20);
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    I.navByClick('.button');
};
