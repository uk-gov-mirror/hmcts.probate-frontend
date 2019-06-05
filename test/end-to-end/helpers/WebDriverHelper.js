'use strict';

const Helper = codecept_helper;
//const helperName = 'WebDriverIO';

class WebDriverHelper extends Helper {

    async waitForNavigationToComplete (locator) {
        const helper = this.helpers.WebDriverIO || this.helpers.Puppeteer;
        const helperIsPuppeteer = this.helpers.Puppeteer;

        helper.click(locator);

        if (helperIsPuppeteer) {
            await helper.page.waitForNavigation({waitUntil: 'networkidle0'});
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
