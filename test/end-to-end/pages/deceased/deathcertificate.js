'use strict';

const contentEn = require('app/resources/en/translation/common');
const contentCy = require('app/resources/cy/translation/common');
const pageUnderTest = require('app/steps/ui/deceased/deathcertificate');

module.exports = async function(language ='en', answer) {
    const I = this;
    const commonContent = language === 'en' ? contentEn : contentCy;

    await I.seeInCurrentUrl(pageUnderTest.getUrl());
    await I.click(`#deathCertificate${answer}`);
    await I.navByClick(commonContent.saveAndContinue);

};
