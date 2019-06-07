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

    whichBrowserIsInUse() {
        const browser = this.helpers.WebDriverIO.browser;
        /* eslint no-console: 0 no-unused-vars: 0 */
        console.log('>>>>', browser.name);
    }
}
module.exports = WebDriverHelper;
