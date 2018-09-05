const commonContent = require('app/resources/en/translation/common.json');
const pageUnderTest = require('app/steps/ui/applicant/aliasreason/index');

module.exports = function () {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#aliasReason-Divorce');

    I.click(commonContent.continue);
};
