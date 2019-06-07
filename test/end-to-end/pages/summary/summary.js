'use strict';

const pageUnderTest = require('app/steps/ui/summary');

module.exports = function (redirect) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl(redirect));

    if (I.getBrowserName() !== 'internet explorer') {
        I.click('#checkAnswerHref');
    }

    I.waitForNavigationToComplete('.button');
};
