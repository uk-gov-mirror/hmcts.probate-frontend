'use strict';

const deathCertificateEn = require('app/resources/en/translation/screeners/deathcertificateinenglish');
const deathCertificateCy = require('app/resources/cy/translation/screeners/deathcertificateinenglish');
const pageUnderTest = require('app/steps/ui/screeners/deathcertificateinenglish');
const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language = 'en') {
    const I = this;
    const deathCertificateContent = language === 'en' ? deathCertificateEn : deathCertificateCy;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.seeInCurrentUrl(pageUnderTest.getUrl());
    await I.waitForText(deathCertificateContent.question);

    await I.wait(2);
    await I.retry(2).click(commonContent.yes);
    await I.navByClick(commonContent.continue);
};
