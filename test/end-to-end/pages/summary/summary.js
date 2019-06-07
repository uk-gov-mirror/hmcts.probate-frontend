'use strict';

const pageUnderTest = require('app/steps/ui/summary');

module.exports = async function (redirect) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl(redirect));

    if (!await I.isInternetExplorer()) {
        I.click('#checkAnswerHref');
    }

    I.waitForNavigationToComplete('.button');
};
