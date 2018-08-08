const Step = require('app/core/steps/Step');

module.exports = class ExecutorsUpdateInviteSent extends Step {

    static getUrl() {
        return '/executors-update-invite-sent';
    }
};
