const ValidationStep = require('app/core/steps/ValidationStep');

module.exports = class ExecutorsUpdateInviteSent extends ValidationStep {

    static getUrl() {
        return '/executors-update-invite-sent';
    }
};
