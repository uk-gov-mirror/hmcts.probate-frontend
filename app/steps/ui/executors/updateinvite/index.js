const ValidationStep = require('app/core/steps/ValidationStep');
const services = require('app/components/services');
const FormatName = require('app/utils/FormatName');

module.exports = class ExecutorsUpdateInvite extends ValidationStep {

    static getUrl() {
        return '/executors-update-invite';
    }

    * handlePost(ctx, errors, formdata, session) {
        yield ctx.list
            .filter(exec => exec.emailChanged)
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
                    } else {
                        exec.inviteId = result;
                        exec.emailSent = true;
                        return exec;
                    }
                });
            });
        ctx.invitesSent = 'true';
        return [ctx, errors];
    }
};
