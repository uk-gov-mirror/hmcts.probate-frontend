'use strict';

module.exports = async function() {
    const I = this;
    await I.checkPageUrl('app/steps/ui/sign-out');
    await I.navByClick('#main-content > div > div > p:nth-child(3) > a');
};
