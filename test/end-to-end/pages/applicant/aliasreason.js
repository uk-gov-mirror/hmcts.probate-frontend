const content = require('app/resources/en/translation/applicant/aliasreason');
const pageUnderTest = require('app/steps/ui/applicant/aliasreason/index');

module.exports = function () {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#aliasDivorce');

    I.click(content.continue);
};
