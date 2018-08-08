const ValidationStep = require('app/core/steps/ValidationStep');
const services = require('app/components/services');
const FormatName = require('app/utils/FormatName');
const ExecutorsWrapper = require('app/wrappers/Executors');

module.exports = class ExecutorsUpdateInvite extends ValidationStep {

    static getUrl() {
        return '/executors-update-invite';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        ctx.executorsEmailChangedList = executorsWrapper.executorsEmailChangedList();
        ctx.notifyExecutorsSuffix = ctx.executorsEmailChangedList.length > 1 ? '-multiple' : '';
        return ctx;
    }

    * handlePost(ctx, errors, formdata, session) {
        yield ctx.executorsEmailChangedList
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
                return services.resendInvite(data, session.id, exec.inviteId, exec).then(result => {
                    if (result.name === 'Error') {
                        throw new ReferenceError('Error while sending co-applicant invitation email.');
                    }
                    delete exec.emailChanged;
                });
            });
        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.executorsEmailChangedList;
        delete ctx.notifyExecutorsSuffix;
        return [ctx, formdata];
    }
};
