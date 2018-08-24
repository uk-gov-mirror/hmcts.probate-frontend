'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const FormatName = require('app/utils/FormatName');
const {size} = require('lodash');

class ExecutorsAdditionalInvite extends ValidationStep {

    static getUrl() {
        return '/executors-additional-invite';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.inviteSuffix = size(ctx.executorsToNotifyList) > 1 ? '-multiple' : '';
        ctx.executorsToNotifyNames = FormatName.formatExecutorNames(ctx.executorsToNotifyList);
        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.inviteSuffix;
        delete ctx.executorsToNotifyNames;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsAdditionalInvite;
