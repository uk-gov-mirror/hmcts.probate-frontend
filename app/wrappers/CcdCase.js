'use strict';

class CcdCase {
    constructor(ccdCaseData) {
        this.ccdCaseData = ccdCaseData || {};
    }

    applicationCompleted() {
        return this.ccdCaseData.state === 'CaseCreated';
    }
}

module.exports = CcdCase;
