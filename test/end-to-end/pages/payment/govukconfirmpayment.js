'use strict';

const testConfig = require('test/config');

module.exports = function () {
    const I = this;

    I.waitInUrl(testConfig.TestGovUkPayBaseUrl);

    I.waitForNavigationToComplete('#confirm');
};
