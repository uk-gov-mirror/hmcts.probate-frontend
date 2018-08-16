'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const services = require('app/components/services');
const FormatName = require('app/utils/FormatName');
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

    * handlePost(ctx, errors, formdata, session) {
        const promises = ctx.executorsToNotifyList
            .map(exec => {
                const data = {
                    invitation: {
                        executorName: exec.fullName,
                        firstName: formdata.deceased.firstName,
                        lastName: formdata.deceased.lastName,
                        email: exec.email,
                        phoneNumber: exec.mobile,
                        formdataId: session.regId,
                        leadExecutorName: FormatName.format(formdata.applicant)
                    }
                };
                return services.sendInvite(data, session.id, exec).then(result => {
                    exec.inviteId = result;
                    exec.emailSent = true;
                    return exec;
                });
            });
        Promise.all(promises).then(result => {
            if (result.name === 'Error') {
                throw new ReferenceError('Error while sending co-applicant invitation email.');
            }
        });
        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.executorsToNotifyList;
        delete ctx.inviteSuffix;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsAdditionalInvite;
