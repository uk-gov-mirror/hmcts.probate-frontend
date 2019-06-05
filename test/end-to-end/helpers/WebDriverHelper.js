'use strict';

const Helper = codecept_helper;
const helperName = 'WebDriver';

class WebDriverHelper extends Helper {

    clickBrowserBackButton() {
        const page = this.helpers[helperName].browser;

        return page.back();
    }

    async waitForNavigationToComplete(locator) {
        await this.helpers[helperName].click(locator);
        //const htmlElement = this.helpers[helperName]._locate(locator);

        //htmlElement.click();
    }
    // async waitForNavigationToComplete(locator) {
    //     const page = this.helpers[helperName].page;
    //
    //     await Promise.all([
    //         page.waitForNavigation({waitUntil: ['domcontentloaded', 'networkidle0']}), // The promise resolves after navigation has finished
    //         page.click(locator) // Clicking the link will indirectly cause a navigation
    //     ]);
    //
    // }
}
module.exports = WebDriverHelper;
