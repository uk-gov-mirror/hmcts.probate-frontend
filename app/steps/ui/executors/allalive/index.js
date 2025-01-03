'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('../../../../components/error');

class ExecutorsAllAlive extends ValidationStep {

    static getUrl() {
        return '/executors-all-alive';
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl(1);
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'allalive', value: 'optionYes', choice: 'whoDied'},
                {key: 'allalive', value: 'optionNo', choice: 'isAlive'}
            ]
        };
    }

    validate(ctx, formdata, language) {
        const validationResult = super.validate(ctx, formdata, language);
        if (!validationResult[0]) { // has errors
            ctx.errors = this.createErrorMessages(validationResult[1], ctx, language);
        }
        return validationResult;
    }

    createErrorMessages(validationErrors, ctx, language) {
        const errorMessages = [];
        validationErrors.forEach((validationError) => {
            const dynamicText = ctx.list.length === 2 ? ctx.list[1].fullName : '';
            const errorMessage = this.composeMessage(language, ctx, dynamicText);
            errorMessages.push(errorMessage);
            validationError.msg = errorMessage.msg;
            validationError.field = 'allalive';
        });
        return errorMessages;
    }

    composeMessage(language, ctx, dynamicText) {
        const messageType = ctx.list.length > 2 ? 'multipleExecutorRequired' : 'singleExecutorRequired';
        const errorMessage = FieldError('allalive', messageType, this.resourcePath, this.generateContent({}, {}, language), language);
        errorMessage.msg = errorMessage.msg.replace('{executorName}', dynamicText);
        return errorMessage;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        if (ctx.allalive === 'optionYes') {
            for (let i = 1; i < ctx.executorsNumber; i++) {
                if (ctx.list[i].isDead) {
                    ctx.list[i].isDead = false;
                    delete ctx.list[i].diedBefore;
                    delete ctx.list[i].notApplyingKey;
                    delete ctx.list[i].notApplyingReason;
                }

            }
        }

        return [ctx, formdata];
    }
}

module.exports = ExecutorsAllAlive;
