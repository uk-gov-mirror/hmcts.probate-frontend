'use strict';

const CollectionStep = require('app/core/steps/CollectionStep');
const {get, some, findIndex} = require('lodash');
const FieldError = require('../../../../components/error');
const path = '/executor-notified/';

class ExecutorNotified extends CollectionStep {

    constructor(steps, section, templatePath, i18next, schema, language) {
        super(steps, section, templatePath, i18next, schema, language);
        this.path = path;
    }

    static getUrl(index = '*') {
        return path + index;
    }

    nextStepOptions(ctx) {
        ctx.nextExecutor = get(ctx, 'index', -1) !== -1;

        return {
            options: [
                {key: 'nextExecutor', value: true, choice: 'roles'}
            ]
        };
    }

    handlePost(ctx, errors, formdata, session) {
        formdata.executors.list[ctx.index].executorNotified = ctx.executorNotified;
        ctx.index = this.recalcIndex(ctx, 0, session.language);
        return [ctx, errors];
    }

    handleGet(ctx, formdata) {
        const currentExecutor = formdata.executors.list[ctx.index];
        ctx.executorNotified = currentExecutor.executorNotified;
        return [ctx];
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
            validationError.field = 'executorNotified';
        });
        return errorMessages;
    }

    composeMessage(language, ctx, executorName) {
        const messageType = 'required';
        const errorMessage = FieldError('executorNotified', messageType, this.resourcePath, this.generateContent({}, {}, language), language);
        errorMessage.msg = errorMessage.msg.replace('{executorName}', executorName);
        return errorMessage;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.otherwise;
        delete ctx.executorNotified;
        delete ctx.executorName;
        delete ctx.nextExecutor;
        return [ctx, formdata];
    }

    isSoftStop(formdata) {
        const execList = get(formdata, 'executors.list', []);
        const softStopForNotNotified = some(execList, exec => exec.executorNotified === 'optionNo');

        return {
            stepName: this.constructor.name,
            isSoftStop: softStopForNotNotified
        };
    }

    recalcIndex(ctx, index, language) {
        return findIndex(ctx.list, exec => !exec.isDead && (ctx.otherExecutorsApplying === this.commonContent(language).no || !exec.isApplying), ctx.index + 1);
    }
}

module.exports = ExecutorNotified;
