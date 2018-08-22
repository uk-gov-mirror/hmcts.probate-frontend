'use strict';
const Step = require('app/core/steps/Step');

class ExecutorsAdditionalInviteSent extends Step {

    static getUrl() {
        return '/executors-additional-invite-sent';
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
        delete formdata.executors.executorsToNotifyList;
        delete ctx.executorsToNotifyList;
        delete ctx.inviteSuffix;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsAdditionalInviteSent;
