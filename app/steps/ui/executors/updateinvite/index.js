const ValidationStep = require('app/core/steps/ValidationStep');

module.exports = class ExecutorsUpdateInvite extends ValidationStep {

    static getUrl() {
        return '/executors-update-invite';
    }
};
