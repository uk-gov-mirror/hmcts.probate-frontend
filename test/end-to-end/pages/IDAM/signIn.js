'use strict';

const testConfig = require('test/config.js');
const useIdam = testConfig.TestUseIdam;

module.exports = function (multipleExecutors = false) {
    if (useIdam === 'true') {
        const I = this;

        if (multipleExecutors) {
            I.amOnPage('/');
        }
        I.wait(5);
        I.see('Sign in');
        I.fillField('username', process.env.testCitizenEmail);
        I.fillField('password', process.env.testCitizenPassword);

        I.waitForNavigationToComplete('Sign in', true);
    }
};
