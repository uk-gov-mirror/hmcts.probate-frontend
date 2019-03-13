'use strict';

const SubmitData = require('./SubmitData');

class ProbateSubmitData extends SubmitData {
    getFormType() {
        return 'PA';
    }
}

module.exports = ProbateSubmitData;
