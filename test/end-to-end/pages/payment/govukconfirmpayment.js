'use strict';

//const testConfig = require('test/config');

module.exports = function () {
    const I = this;

    I.waitFortext('Payment summary', 20);
    I.waitForElement('#confirm', 20);

    I.waitForNavigationToComplete('#confirm');
};
