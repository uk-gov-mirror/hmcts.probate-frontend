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
        const helper = this.helpers.WebDriverIO;
        const browserName = this.helpers.WebDriverIO.config.browser;

        console.log('browserName>>>>', browserName);
        if (browserName !== 'MicrosoftEdge') {
            console.log('NOT Edge');
            await helper.waitForExist('.dz-hidden-input', testConfig.TestWaitForElementToAppear * testConfig.TestOneMilliSecond);
            await helper.chooseFile('.dz-hidden-input', '/uploadDocuments/test_file_for_document_upload.png');
            await helper.waitForEnabled('#button', testConfig.TestDocumentToUpload);
        }
        /* eslint no-useless-return: 0 no-unused-vars: 0 */
        return;
    }

}
module.exports = WebDriverHelper;
