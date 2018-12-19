'use strict';

const pageUnderTest = require('app/steps/ui/documentupload/index');

module.exports = function () {
    const I = this;
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    I.click('#button');
};
