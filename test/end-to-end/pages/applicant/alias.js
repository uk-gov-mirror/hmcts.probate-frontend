const content = require('app/resources/en/translation/applicant/aliasreason');
const pageUnderTest = require('app/steps/ui/applicant/alias/index');

module.exports = function (alias) {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.fillField('#alias', alias);

    I.click(content.continue);
};
