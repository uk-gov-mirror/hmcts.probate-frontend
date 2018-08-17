'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const ExecutorsWrapper = require('app/wrappers/Executors');

class ExecutorsAdditionalInvite extends ValidationStep {

    static getUrl() {
        return '/executors-additional-invite';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        ctx.executorsToNotifyList = executorsWrapper.executorsToNotifyList();
        ctx.inviteSuffix = ctx.executorsToNotifyList > 1 ? '-multiple' : '';
        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.executorsToNotifyList;
        delete ctx.inviteSuffix;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsAdditionalInvite;
