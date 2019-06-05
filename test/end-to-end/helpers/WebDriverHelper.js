'use strict';

const Helper = codecept_helper;
const helperName = 'WebDriverIO';

class WebDriverHelper extends Helper {

    clickBrowserBackButton() {
        const browser = this.helpers[helperName].browser;

        return browser.back();
    }

    async waitForNavigationToComplete(locator) {
        // const browser = this.helpers[helperName].browser;

        const helper = this.helpers[helperName];
        helper.click(locator);

        await helper.wait(4);
    }
}
module.exports = WebDriverHelper;
