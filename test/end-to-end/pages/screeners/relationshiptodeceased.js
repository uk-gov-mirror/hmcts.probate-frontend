'use strict';

const commonContent = require('../../../../app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/relationshiptodeceased/index');

module.exports = function () {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#related-optionYes');

    I.click(commonContent.continue);
};
