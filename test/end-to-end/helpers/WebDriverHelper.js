'use strict';

const Helper = codecept_helper;

class WebDriverHelper extends Helper {

    async waitForNavigationToComplete (locator, signIn = false) {
        const helper = this.helpers.WebDriverIO;

        helper.click(locator);

        // login from IDAM can take a bit longer so wait a little longer
        if (signIn) {
            await helper.wait(8);
        } else {
            await helper.wait(4);
        }
    }

    clickBrowserBackButton() {
        const browser = this.helpers.WebDriverIO.browser;

        return browser.back();
    }

    isInternetExplorer() {

        /* eslint-disable no-console */
        console.log('==========================================');
        console.log('==========================================');
        console.log('==========================================');
        console.log('==========================================');
        console.log('io>>>', this.helpers.WebDriverIO.config.browser);
        console.log('==========================================');
        console.log('==========================================');
        console.log('==========================================');
        console.log('==========================================');
        console.log('io>>>', this.helpers.WebDriverIO.config.desiredCapabilities.name);
        console.log('==========================================');
        console.log('==========================================');

        return (this.helpers.WebDriverIO.config.browser === 'internet explorer');

    }

    uploadDocument() {
        const browser = this.helpers.WebDriverIO;

        browser.switchTo().window(browser.windowHandles.last());
        // eslint-disable-next-line no-undef
        browser.findElement(By.id('file')).sendKeys('/uploadDocuments/test_file_for_document_upload.png');
    }
}
module.exports = WebDriverHelper;
