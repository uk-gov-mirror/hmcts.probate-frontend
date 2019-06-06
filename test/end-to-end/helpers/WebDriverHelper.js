'use strict';

const Helper = codecept_helper;

class WebDriverHelper extends Helper {

    async waitForNavigationToComplete (locator) {
        const helper = this.helpers.WebDriverIO || this.helpers.Puppeteer;

        helper.click(locator);

        await helper.wait(4);
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
