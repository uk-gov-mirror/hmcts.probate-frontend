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
        const browser = this.helpers.WebDriverIO.browser;

        /* eslint-disable no-console */
        console.log('browser>>>', browser.toString());
        console.log('==========================================');
        console.log('==========================================');
        console.log('==========================================');
        console.log('==========================================');
        console.log('io>>>', this.helpers.WebDriverIO);
    }
}
module.exports = WebDriverHelper;
