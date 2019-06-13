'use strict';

const testConfig = require('test/config.js');
const useIdam = testConfig.TestUseIdam;

module.exports = function (multipleExecutors = false) {
    if (useIdam === 'true') {
        const I = this;

        if (multipleExecutors) {
            I.amOnPage('/');
        }

        I.see('Sign in');
        I.fillField('username', process.env.testCitizenEmail);
        I.fillField('password', process.env.testCitizenPassword);

        I.navByClick('Sign in', true);
    }
};
