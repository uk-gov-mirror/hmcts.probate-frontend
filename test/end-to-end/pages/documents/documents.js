'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/documents');

module.exports = () => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.downloadPdfIfNotIE11('#coverSheetPdfHref');

    I.navByClick(commonContent.continue);
};
