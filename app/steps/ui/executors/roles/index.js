'use strict';

const CollectionStep = require('app/core/steps/CollectionStep');
const {get, isEmpty, every, findIndex, forEach} = require('lodash');
const FieldError = require('../../../../components/error');
const path = '/executor-roles/';

class ExecutorRoles extends CollectionStep {

    constructor(steps, section, templatePath, i18next, schema, language) {
        super(steps, section, templatePath, i18next, schema, language);
        this.path = path;
    }

    static getUrl(index = '*') {
        return path + index;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        forEach(ctx.list, exec => {
            if (exec.notApplyingKey) {
                exec.notApplyingReason = exec.notApplyingKey;
            }
        });

        return ctx;
    }

    handleGet(ctx) {
        if (ctx.list[ctx.index]) {
            ctx.isApplying = false;
            ctx.notApplyingReason = ctx.list[ctx.index].notApplyingKey;
        }
        return [ctx];
    }

    handlePost(ctx, errors) {
        if (ctx.list[ctx.index]) {
            ctx.list[ctx.index] = this.pruneExecutorData(ctx.list[ctx.index]);
            ctx.list[ctx.index].isApplying = false;
            ctx.list[ctx.index].notApplyingReason = ctx.notApplyingReason;
            ctx.list[ctx.index].notApplyingKey = ctx.notApplyingReason;
        }
        if (ctx.notApplyingReason !== 'optionPowerReserved') {
            ctx.index = this.recalcIndex(ctx, ctx.index);
        }
        return [ctx, errors];
    }

    pruneExecutorData(data) {
        delete data.address;
        delete data.currentName;
        delete data.currentNameReason;
        delete data.email;
        delete data.hasOtherName;
        delete data.mobile;
        delete data.postcode;
        return data;
    }

    isComplete(ctx) {
        return [every(ctx.list, exec => {
            return exec.isApplying ||
                (
                    !isEmpty(exec.notApplyingKey) &&
                    (
                        (exec.notApplyingKey === 'optionPowerReserved' && !isEmpty(exec.executorNotified)) ||
                        (exec.notApplyingKey !== 'optionPowerReserved')
                    )
                );
        }), 'inProgress'];
    }

    nextStepOptions(ctx) {
        ctx.continue = get(ctx, 'index', -1) !== -1;

        return {
            options: [
                {key: 'notApplyingReason', value: 'optionPowerReserved', choice: 'powerReserved'},
                {key: 'continue', value: true, choice: 'continue'}
            ]
        };
    }

    validate(ctx, formdata, language) {
        const validationResult = super.validate(ctx, formdata, language);
        if (!validationResult[0]) {
            ctx.errors = this.createErrorMessages(validationResult[1], ctx, language);
        }
        return validationResult;
    }

    createErrorMessages(validationErrors, ctx, language) {
        const errorMessages = [];
        validationErrors.forEach((validationError) => {
            const executorName = ctx.list[ctx.index].fullName;
            const errorMessage = this.composeMessage(language, ctx, executorName);
            errorMessages.push(errorMessage);
            validationError.msg = errorMessage.msg;
            validationError.field = 'notApplyingReason';
        });
        return errorMessages;
    }

    composeMessage(language, ctx, executorName) {
        const messageType = 'required';
        const errorMessage = FieldError('notApplyingReason', messageType, this.resourcePath, this.generateContent({}, {}, language), language);
        errorMessage.msg = errorMessage.msg.replace('{executorName}', executorName);
        return errorMessage;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.otherwise;
        delete ctx.executorName;
        delete ctx.isApplying;
        delete ctx.notApplyingReason;
        delete ctx.continue;
        return [ctx, formdata];
    }

    recalcIndex(ctx, index) {
        return findIndex(ctx.list, exec => !exec.isDead && (ctx.otherExecutorsApplying === 'optionNo' || !exec.isApplying), index + 1);
    }
}

module.exports = ExecutorRoles;
