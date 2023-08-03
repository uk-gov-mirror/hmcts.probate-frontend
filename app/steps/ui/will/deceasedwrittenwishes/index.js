'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const WillCodicils = require('app/steps/ui/will/codicils');

class DeceasedWrittenWishes extends ValidationStep {

    static getUrl() {
        return '/deceased-written-wishes';
    }
    static getPreviousUrl() {
        return WillCodicils.getUrl();
    }

}

module.exports = DeceasedWrittenWishes;
