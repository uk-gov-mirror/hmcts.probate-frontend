'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class BilingualGOP extends ValidationStep {

    static getUrl() {
        return '/bilingual-gop';
    }

    static getPreviousUrl() {
        return '/task-list';
    }
}

module.exports = BilingualGOP;
