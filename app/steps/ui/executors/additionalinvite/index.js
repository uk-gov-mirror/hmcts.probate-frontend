'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');

class ExecutorsAdditionalInvite extends ValidationStep {

    static getUrl() {
        return '/executors-additional-invite';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const executors = req.session.form.executors;
        ctx.executorsToNotifyList = executors.executorsToNotifyList;
        ctx.inviteSuffix = ctx.executorsToNotifyList.length > 1 ? '-multiple' : '';
        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.inviteSuffix;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsAdditionalInvite;
