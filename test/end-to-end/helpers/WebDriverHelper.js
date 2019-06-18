'use strict';

const Helper = codecept_helper;
const testConfig = require('test/config');

class WebDriverHelper extends Helper {

    clickBrowserBackButton() {
        const browser = this.helpers.WebDriverIO.browser;

        return browser.back();
    }

    isInternetExplorer() {
        return (this.helpers.WebDriverIO.config.browser === 'internet explorer');
    }

    isEdge() {
        /* eslint no-console: 0 no-unused-vars: 0 */
        const browser = this.helpers.WebDriverIO.browser;
        console('here1');
        console.log('browser>>>>', browser.config.browser);
        // if (browser.config.browser !== 'MicrosoftEdge') {
        //     console.log('browser.config.browser>>>>>>>>', browser.config.browser);
        //     browser.waitForExist('.dz-hidden-input', testConfig.TestWaitForElementToAppear * testConfig.TestOneMilliSecond);
        //     browser.chooseFile('.dz-hidden-input', '/uploadDocuments/test_file_for_document_upload.png');
        //     browser.waitForEnabled('#button', testConfig.TestDocumentToUpload);
        // }
    }

}
module.exports = WebDriverHelper;
