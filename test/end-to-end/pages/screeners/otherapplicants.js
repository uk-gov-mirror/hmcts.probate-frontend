'use strict';

const commonContent = require('../../../../app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/otherapplicants/index');

module.exports = function () {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#otherApplicants-optionNo');

    I.click(commonContent.continue);
};
