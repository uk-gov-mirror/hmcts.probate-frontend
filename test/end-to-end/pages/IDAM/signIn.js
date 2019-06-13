'use strict';

const testConfig = require('test/config.js');
const useIdam = testConfig.TestUseIdam;

module.exports = function (multipleExecutors = false) {
    if (useIdam === 'true') {
        const I = this;

        if (multipleExecutors) {
            I.amOnPage('/');
        }

        I.waitForText('Sign in', 20);
        I.fillField('username', process.env.testCitizenEmail);
        I.fillField('password', process.env.testCitizenPassword);

        I.click('Sign in');
    }
};
