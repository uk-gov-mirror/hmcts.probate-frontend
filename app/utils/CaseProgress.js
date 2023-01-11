'use strict';

class CaseProgress {
    static applicationSubmitted(state) {
        return !(state === 'Pending' || state === 'PAAppCreated' || state === 'CasePaymentFailed');
    }
    static grantIssued(state) {
        return state === 'BOGrantIssued';
    }

    static applicationInReview(state) {
        return this.applicationSubmitted(state) && !(state === 'CaseCreated' || state === 'CasePrinted' || state === 'BOReadyForExamination');
    }

    static documentsReceived(state) {
        return this.applicationSubmitted(state) && (this.applicationInReview(state) || state === 'BOReadyForExamination');
    }

    static caseStopped(state) {
        return state === 'BOCaseStopped';
    }

    static caseClosed(state) {
        return state === 'BOCaseClosed';
    }
}

module.exports = CaseProgress;
