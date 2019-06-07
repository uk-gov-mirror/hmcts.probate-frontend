'use strict';

const pageUnderTest = require('app/steps/ui/summary');

module.exports = function (redirect) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl(redirect));
    I.click('#checkAnswerHref');
    I.switchTo(1);
    I.click('Cancel');
    I.switchTo(0);

    I.waitForNavigationToComplete('.button');
};
