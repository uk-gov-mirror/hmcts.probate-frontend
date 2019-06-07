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

    getBrowserName() {
        const browser = this.helpers.WebDriverIO.browser;
        const helper = this.helpers.WebDriverIO;

        helper.desiredCapabilities.valueOf();
        /* eslint-disable no-console */
        // console.log('browser>>>', browser);
        console.log('>>>>', helper.desiredCapabilities.valueOf());
        console.log('bname>>>', browser);
        return browser;
    }
}
module.exports = WebDriverHelper;
