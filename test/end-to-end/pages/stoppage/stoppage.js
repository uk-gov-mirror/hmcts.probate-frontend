'use strict';

const pageUnderTest = require('app/steps/ui/stoppage/index');

module.exports = function (url, header, links) {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl(url));
    I.see(header);
    for (const link of links) {
        I.see(link);
    }

    I.clickBrowserBackButton();
};
