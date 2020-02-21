'use strict';

const Step = require('app/core/steps/Step');
const utils = require('app/components/step-utils');
const ExecutorsWrapper = require('app/wrappers/Executors');
const caseTypes = require('app/utils/CaseTypes');
const featureToggle = require('app/utils/FeatureToggle');

class TaskList extends Step {

    static getUrl() {
        return '/task-list';
    }

    previousTaskStatus(previousTasks) {
        const allPreviousTasksComplete = previousTasks.every((task) => {
            return task.status === 'complete';
        });
        return allPreviousTasksComplete ? 'complete' : 'started';
    }

    copiesPreviousTaskStatus(session, ctx) {
        if (ctx.caseType === caseTypes.GOP) {
            if (ctx.hasMultipleApplicants && session.haveAllExecutorsDeclared === 'false') {
                return 'locked';
            }

            return this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask, ctx.ReviewAndConfirmTask]);
        }

        return this.previousTaskStatus([ctx.DeceasedTask, ctx.ApplicantsTask, ctx.ReviewAndConfirmTask]);
    }

    getContextData(req, res, featureToggles) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;

        ctx.isPCQToggleEnabled = featureToggle.isEnabled(featureToggles, 'pcq_toggle');

        if (ctx.isPCQToggleEnabled) {
            ctx.equalityHealth = req.session.equalityHealth;
        } else {
            ctx.equalityHealth = 'DOWN';
        }

        utils.updateTaskStatus(ctx, req, this.steps);

        ctx.alreadyDeclared = this.alreadyDeclared(req.session);
        ctx.alreadyDeclaredType = typeof ctx.alreadyDeclared;

        if (ctx.caseType === caseTypes.GOP) {
            const executorsWrapper = new ExecutorsWrapper(formdata.executors);
            ctx.hasMultipleApplicants = executorsWrapper.hasMultipleApplicants();
            ctx.declarationStatuses = formdata.executorsDeclarations || [];

            if (ctx.equalityHealth === 'UP') {
                ctx.previousTaskStatus = {
                    DeceasedTask: ctx.DeceasedTask.status,
                    ExecutorsTask: ctx.DeceasedTask.status,
                    ReviewAndConfirmTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask]),
                    CopiesTask: this.copiesPreviousTaskStatus(req.session, ctx),
                    EqualityTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask]),
                    PaymentTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask, ctx.EqualityTask]),
                    DocumentsTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask, ctx.EqualityTask, ctx.PaymentTask])
                };
            } else {
                ctx.previousTaskStatus = {
                    DeceasedTask: ctx.DeceasedTask.status,
                    ExecutorsTask: ctx.DeceasedTask.status,
                    ReviewAndConfirmTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask]),
                    CopiesTask: this.copiesPreviousTaskStatus(req.session, ctx),
                    PaymentTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask]),
                    DocumentsTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ExecutorsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask, ctx.PaymentTask])
                };
            }
        } else if (ctx.caseType === caseTypes.INTESTACY) {
            if (ctx.equalityHealth === 'UP') {
                ctx.previousTaskStatus = {
                    DeceasedTask: ctx.DeceasedTask.status,
                    ApplicantsTask: ctx.DeceasedTask.status,
                    ReviewAndConfirmTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ApplicantsTask]),
                    CopiesTask: this.copiesPreviousTaskStatus(req.session, ctx),
                    EqualityTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ApplicantsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask]),
                    PaymentTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ApplicantsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask, ctx.EqualityTask]),
                };
            } else {
                ctx.previousTaskStatus = {
                    DeceasedTask: ctx.DeceasedTask.status,
                    ApplicantsTask: ctx.DeceasedTask.status,
                    ReviewAndConfirmTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ApplicantsTask]),
                    CopiesTask: this.copiesPreviousTaskStatus(req.session, ctx),
                    PaymentTask: this.previousTaskStatus([ctx.DeceasedTask, ctx.ApplicantsTask, ctx.ReviewAndConfirmTask, ctx.CopiesTask]),
                };
            }
        }

        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.hasMultipleApplicants;
        delete ctx.alreadyDeclared;
        delete ctx.previousTaskStatus;
        delete ctx.caseType;
        delete ctx.declarationStatuses;
        return [ctx, formdata];
    }
}

module.exports = TaskList;
