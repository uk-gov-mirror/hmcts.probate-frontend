'use strict';

const pageUnderTest = require('app/steps/ui/tasklist/index');
const taskListContent = require('app/resources/en/translation/tasklist');

module.exports = function (link) {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    let selector = '.button';
    if (link === taskListContent.taskNotStarted) {
        selector = '.button-start';
    }
    I.awaitNavigation(selector);
};
