'use strict';

const pageUnderTest = require('app/steps/ui/summary');

module.exports = function (redirect) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl(redirect));
    I.click('#checkAnswerHref');

    I.click('Cancel');

    I.waitForNavigationToComplete('.button');
};
