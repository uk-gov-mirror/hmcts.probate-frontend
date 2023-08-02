'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const TaskList = require('app/steps/ui/tasklist');

class BilingualGOP extends ValidationStep {

    static getUrl() {
        return '/bilingual-gop';
    }

    static getPreviousUrl() {
        return TaskList.getUrl();
    }
}

module.exports = BilingualGOP;
