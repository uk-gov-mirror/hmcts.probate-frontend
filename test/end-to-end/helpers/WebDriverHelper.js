'use strict';

const Helper = codecept_helper;

class WebDriverHelper extends Helper {

    async navByClick (locator, signIn = false) {
        const helper = this.helpers.WebDriverIO;

        helper.click(locator);

        // login from IDAM can take a bit longer so wait a little longer
        await helper.waitForElement('#content');

        if (signIn) {
            await helper.wait(8);
        }
    }

    clickBrowserBackButton() {
        const browser = this.helpers.WebDriverIO.browser;

        return browser.back();
    }

    isInternetExplorer() {
        return (this.helpers.WebDriverIO.config.browser === 'internet explorer');
    }

    isEdge() {
        return (this.helpers.WebDriverIO.config.browser === 'MicrosoftEdge');
    }

}
module.exports = WebDriverHelper;
