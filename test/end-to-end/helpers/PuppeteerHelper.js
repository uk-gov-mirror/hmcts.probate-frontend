'use strict';

const Helper = codecept_helper;
const helperName = 'Puppeteer';

class PuppeteerHelper extends Helper {

    clickBrowserBackButton() {
        const page = this.helpers[helperName].page;

        return page.goBack();
    }

    async awaitNavigation(selector) {
        const page = this.helpers[helperName].page;
        await Promise.all([
            page.waitForNavigation(), // The promise resolves after navigation has finished
            page.click(selector), // Clicking the link will indirectly cause a navigation
        ]);
    }

}

module.exports = PuppeteerHelper;
