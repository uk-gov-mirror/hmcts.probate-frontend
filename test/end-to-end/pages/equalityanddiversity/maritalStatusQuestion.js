'use strict';

const commonContentEn = require('app/resources/en/translation/common');
const commonContentCy = require('app/resources/cy/translation/common');

module.exports = async function(language ='en') {
    const I = this;
    const commonContent = language === 'en' ? commonContentEn : commonContentCy;

    await I.wait(3);

    await I.seeInCurrentUrl('marital-status');
    await I.navByClick(commonContent.preferNotToSay);
    await I.navByClick(commonContent.continue);
};
