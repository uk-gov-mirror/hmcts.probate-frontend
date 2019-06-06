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

    // clickBrowserBackButton() {
    //     const browser = this.helpers[helperName].browser;
    //
    //     return browser.back();
    // }
    //
    // async waitForNavigationToComplete(locator) {
    //     // const browser = this.helpers[helperName].browser;
    //
    //     const helper = this.helpers[helperName];
    //     helper.click(locator);
    //
    //     await helper.wait(4);
    // }
}
module.exports = WebDriverHelper;
