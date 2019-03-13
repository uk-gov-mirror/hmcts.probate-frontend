'use strict';

const SubmitData = require('./SubmitData');
const submitData = require('app/components/submit-data');

class ProbateSubmitData extends SubmitData {
    getFormType(){
        return 'PA';
    }
}

module.exports = ProbateSubmitData;
