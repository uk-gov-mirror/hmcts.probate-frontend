'use strict';

const commonContent = require('../../../../app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/diedafteroctober2014/index');

module.exports = function () {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#diedAfter-optionYes');

    I.click(commonContent.continue);
};
