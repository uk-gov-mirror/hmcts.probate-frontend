'use strict';

const content = require('app/resources/en/translation/tasklist');
const pageUnderTest = require('app/steps/ui/tasklist');

module.exports = function () {
    const I = this;
    I.waitForText(content.introduction, 20);
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.click('.button');
};
