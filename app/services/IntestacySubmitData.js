'use strict';

const SubmitData = require('./SubmitData');

class IntestacySubmitData extends SubmitData {

    getFormType() {
        return 'Intestacy';
    }
}

module.exports = IntestacySubmitData;
