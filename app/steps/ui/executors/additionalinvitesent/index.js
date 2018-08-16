'use strict';
const Step = require('app/core/steps/Step');

class ExecutorsAdditionalInviteSent extends Step {

    static getUrl() {
        return '/executors-additional-invite-sent';
    }
}
module.exports = ExecutorsAdditionalInviteSent;
