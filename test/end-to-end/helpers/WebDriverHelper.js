'use strict';

const Helper = codecept_helper;
const testConfig = require('test/config');

class WebDriverHelper extends Helper {

    clickBrowserBackButton() {
        const browser = this.helpers.WebDriverIO.browser;

        return browser.back();
    }

    async downloadPdfIfNotIE11(pdf) {
        const browserName = this.helpers.WebDriverIO.config.browser;
        const helper = this.helpers.WebDriverIO;

        if (browserName !== 'internet explorer') {
            await helper.click(pdf);
        }
    }

    async uploadDocumentIfNotMicrosoftEdge() {
        const browserName = this.helpers.WebDriverIO.config.browser;
        const helper = this.helpers.WebDriverIO;

        if (browserName !== 'MicrosoftEdge') {
            await helper.waitForElement('.dz-hidden-input', testConfig.TestWaitForElementToAppear * testConfig.TestOneMilliSecond);
            await helper.attachFile('.dz-hidden-input', '/uploadDocuments/test_file_for_document_upload.png');
            await helper.waitForEnabled('#button', testConfig.TestDocumentToUpload);
        }
        /* eslint no-useless-return: 0 no-unused-vars: 0 */
        return;
    }

}
module.exports = WebDriverHelper;
