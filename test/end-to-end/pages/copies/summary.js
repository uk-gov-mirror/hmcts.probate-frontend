const pageUnderTest = require('app/steps/ui/copies/summary/index');

module.exports = function () {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    I.awaitNavigation('a[href="/tasklist"]');
};
