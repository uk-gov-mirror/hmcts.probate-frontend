/* eslint-disable no-await-in-loop */
'use strict';

module.exports = async function () {
    const I = this;
    await I.checkPageUrl('app/steps/ui/tasklist');
    const locator = {css: '.govuk-button'};
    await I.click(locator);
};
