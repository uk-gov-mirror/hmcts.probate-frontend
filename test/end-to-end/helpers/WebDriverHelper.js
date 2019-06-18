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

    async isEdge() {
        /* eslint no-console: 0 no-unused-vars: 0 */
        //const helper = this.helpers.WebDriverIO.browser;
        const browserName = this.helpers.WebDriverIO.config.browser;
        const helper = this.helpers.WebDriverIO;

        console.log('browserName>>>>', browserName);
        if (browserName !== 'MicrosoftEdge') {
            console.log('NOT Edge');
            await helper.waitForElement('.dz-hidden-input', testConfig.TestWaitForElementToAppear * testConfig.TestOneMilliSecond);
            console.log('done step 1');
            await helper.attachFile('.dz-hidden-input', '/uploadDocuments/test_file_for_document_upload.png');
            console.log('done step 2');
            await helper.waitForEnabled('#button', testConfig.TestDocumentToUpload);
            console.log('done step 3');
        }
        /* eslint no-useless-return: 0 no-unused-vars: 0 */
        return;
    }

}
module.exports = WebDriverHelper;
