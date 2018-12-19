'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/newmentalcapacity/index');

module.exports = function (option) {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#mentalCapacity-option' + option);

    I.click(commonContent.continue);
};
