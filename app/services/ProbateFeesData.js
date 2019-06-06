'use strict';

const FeesData = require('./FeesData');

class ProbateFeesData extends FeesData {

    getFormType() {
        return 'PA';
    }
}

module.exports = ProbateFeesData;
