'use strict';

const pageUnderTest = require('app/steps/ui/summary');

module.exports = function(redirect) {
    const I = this;
    console.log('pageUnderTest.getUrl(redirect)>>>', pageUnderTest.getUrl(redirect));

    I.seeCurrentUrlEquals(pageUnderTest.getUrl(redirect));

    I.downloadPdfIfNotIE11('#checkAnswerHref');

    I.navByClick('.govuk-button');
};
