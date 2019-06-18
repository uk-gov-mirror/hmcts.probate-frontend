'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/documentupload');
const testConfig = require('test/config');

module.exports = function () {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.waitForVisible('.document-upload__dropzone-text--choose-file');
    console.log('loading document 1 >>', I.isEdge());

    if (I.isEdge() === 'f') {
        //if (I.seeElementInDOM('.dz-hidden-input')) {
        /* eslint no-console: 0 no-unused-vars: 0 */
        console.log('>>>>>>>>>>>>>>>>>>>>>>>loading document<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        I.waitForElement('.dz-hidden-input', testConfig.TestWaitForElementToAppear);
        I.attachFile('.dz-hidden-input', '/uploadDocuments/test_file_for_document_upload.png');
        I.waitForEnabled('#button', testConfig.TestDocumentToUpload);
        // }
    }

    I.navByClick(commonContent.continue);
};
