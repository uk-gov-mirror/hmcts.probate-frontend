'use strict';

const Helper = codecept_helper;

class WebDriverHelper extends Helper {

    clickBrowserBackButton() {
        const browser = this.helpers.WebDriverIO.browser;

        return browser.back();
    }

    isInternetExplorer() {
        return (this.helpers.WebDriverIO.config.browser === 'internet explorer');
    }

    isEdge() {
        let ret = false;
        /* eslint no-console: 0 no-unused-vars: 0 */
        console.log('browser>>>>', this.helpers.WebDriverIO.config.browser + '<<<<<<');

        if (this.helpers.WebDriverIO.config.browser === 'MicrosoftEdge') {
            ret = true;
        }

        console.log('true or false>>>', ret);
        return ret;
    }

}
module.exports = WebDriverHelper;
