'use strict';

const pageUnderTest = require('app/steps/ui/tasklist');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.click('.button');
};
