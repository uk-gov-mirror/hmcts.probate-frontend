'use strict';

const ExecutorsWrapper = require('app/wrappers/Executors');
const FormatName = require('app/utils/FormatName');
const logger = require('app/components/logger')('Init');
const InviteLink = require('app/services/InviteLink');
const config = require('app/config');

class AdditionalExecutorInvite {
    static invite(req) {
        const session = req.session;
        const formdata = req.session.form;
        const inviteLink = new InviteLink(config.services.orchestrator.url, session.id);
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        const executorsToNotifyList = executorsWrapper.executorsToNotify();

        executorsToNotifyList
            .map(exec => {
                return {
                    executorName: exec.fullName,
                    firstName: formdata.deceased.firstName,
                    lastName: formdata.deceased.lastName,
                    email: exec.email,
                    phoneNumber: exec.mobile,
                    formdataId: session.regId,
                    leadExecutorName: FormatName.format(formdata.applicant)
                };
            });

        inviteLink.post(executorsToNotifyList, req.authToken, req.session.serviceAuthorization)
            .then(result => {
                if (result.name === 'Error') {
                    logger.error(`Error while sending executor email invites: ${result}`);
                    throw new ReferenceError('Error while sending co-applicant invitation emails.');
                } else {
                    result.invites.forEach((execResult) => {
                        const result = {
                            inviteId: execResult.inviteId,
                            emailSent: true
                        };

                        Object.assign(formdata.executors.list.find(execList => execList.email === execResult.email), result);
                    });

                    return formdata.executors;
                }
            });

        // const promises = executorsToNotifyList
        //     .map(exec => {
        //         const data = {
        //             executorName: exec.fullName,
        //             firstName: formdata.deceased.firstName,
        //             lastName: formdata.deceased.lastName,
        //             email: exec.email,
        //             phoneNumber: exec.mobile,
        //             formdataId: session.regId,
        //             leadExecutorName: FormatName.format(formdata.applicant)
        //         };
        //         const inviteLink = new InviteLink(config.services.orchestrator.url, session.id);
        //         return inviteLink.post(data, exec);
        //     });
        // return Promise.all(promises).then(result => {
        //     if (result.some(r => r.name === 'Error')) {
        //         logger.error(`Error while sending emails to updated email address: ${result}`);
        //         throw new ReferenceError('Error while sending co-applicant invitation email.');
        //     }
        //     executorsWrapper.executorsToNotify()
        //         .map((exec, index) => {
        //             exec.inviteId = result[index];
        //             exec.emailSent = true;
        //             return exec;
        //         });
        //     return formdata.executors;
        // });
    }
}

module.exports = AdditionalExecutorInvite;
